import { useAppSelector } from "@application/store";
import { ApiStudentGetPageGetRequest, StudentAddDTO, StudentApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getStudentsQueryKey = "getStudentsQuery";
const getStudentQueryKey = "getStudentQuery";
const addStudentMutationKey = "addStudentMutation";
const deleteStudentMutationKey = "deleteStudentMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useStudentApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getStudents = (page: ApiStudentGetPageGetRequest) => new StudentApi(config).apiStudentGetPageGet(page); // Use the generated client code and adapt it.
    const getStudent = (id: string) => new StudentApi(config).apiStudentGetByIdIdGet({ id });
    const addStudent = (user: StudentAddDTO) => new StudentApi(config).apiStudentAddPost({ studentAddDTO: user });
    const deleteStudent = (id: string) => new StudentApi(config).apiStudentDeleteIdDelete({ id });

    return {
        getStudents: { // Return the query object.
            key: getStudentsQueryKey, // Add the key to identify the query.
            query: getStudents // Add the query callback.
        },
        getStudent: {
            key: getStudentQueryKey,
            query: getStudent
        },
        addStudent: { // Return the mutation object.
            key: addStudentMutationKey, // Add the key to identify the mutation.
            mutation: addStudent // Add the mutation callback.
        },
        deleteStudent: {
            key: deleteStudentMutationKey,
            mutation: deleteStudent
        }
    }
}