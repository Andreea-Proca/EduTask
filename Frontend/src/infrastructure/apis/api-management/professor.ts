import { useAppSelector } from "@application/store";
import { ApiProfessorGetPageGetRequest, ProfessorAddDTO, ProfessorApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getAllProfessorsQueryKey = "getAllProfessorsQuery";
const getProfessorsQueryKey = "getProfessorsQuery";
const getProfessorQueryKey = "getProfessorQuery";
const addProfessorMutationKey = "addProfessorMutation";
const deleteProfessorMutationKey = "deleteProfessorMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useProfessorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAllProfessors = () => new ProfessorApi(config).apiProfessorGetProfessorsGet();
    const getProfessors = (page: ApiProfessorGetPageGetRequest) => new ProfessorApi(config).apiProfessorGetPageGet(page); // Use the generated client code and adapt it.
    const getProfessor = (id: string) => new ProfessorApi(config).apiProfessorGetByIdIdGet({ id });
    const addProfessor = (user: ProfessorAddDTO) => new ProfessorApi(config).apiProfessorAddPost({ professorAddDTO: user });
    const deleteProfessor = (id: string) => new ProfessorApi(config).apiProfessorDeleteIdDelete({ id });

    return {
        getAllProfessors: {
            key: getProfessorsQueryKey,
            query: getAllProfessors
        },
        getProfessors: { // Return the query object.
            key: getProfessorsQueryKey, // Add the key to identify the query.
            query: getProfessors // Add the query callback.
        },
        getProfessor: {
            key: getProfessorQueryKey,
            query: getProfessor
        },
        addProfessor: { // Return the mutation object.
            key: addProfessorMutationKey, // Add the key to identify the mutation.
            mutation: addProfessor // Add the mutation callback.
        },
        deleteProfessor: {
            key: deleteProfessorMutationKey,
            mutation: deleteProfessor
        }
    }
}