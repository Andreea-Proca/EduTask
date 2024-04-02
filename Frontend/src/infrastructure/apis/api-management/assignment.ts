import { useAppSelector } from "@application/store";
import { ApiAssignmentGetPageGetRequest, AssignmentAddDTO, AssignmentApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getAssignmentsQueryKey = "getAssignmentsQuery";
const getAssignmentQueryKey = "getAssignmentQuery";
const addAssignmentMutationKey = "addAssignmentMutation";
const deleteAssignmentMutationKey = "deleteAssignmentMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useAssignmentApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAssignments = (page: ApiAssignmentGetPageGetRequest) => new AssignmentApi(config).apiAssignmentGetPageGet(page); // Use the generated client code and adapt it.
    const getAssignment = (id: string) => new AssignmentApi(config).apiAssignmentGetByIdIdGet({ id });
    const addAssignment = (user: AssignmentAddDTO) => new AssignmentApi(config).apiAssignmentAddPost({ assignmentAddDTO: user });
    const deleteAssignment = (id: string) => new AssignmentApi(config).apiAssignmentDeleteIdDelete({ id });

    return {
        getAssignments: { // Return the query object.
            key: getAssignmentsQueryKey, // Add the key to identify the query.
            query: getAssignments // Add the query callback.
        },
        getAssignment: {
            key: getAssignmentQueryKey,
            query: getAssignment
        },
        addAssignment: { // Return the mutation object.
            key: addAssignmentMutationKey, // Add the key to identify the mutation.
            mutation: addAssignment // Add the mutation callback.
        },
        deleteAssignment: {
            key: deleteAssignmentMutationKey,
            mutation: deleteAssignment
        }
    }
}