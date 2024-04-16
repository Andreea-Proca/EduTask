// import { useTableController } from "../Table.controller";
import { useProfessorApi, useSubjectApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
// import { SubjectDTOList } from "@infrastructure/types/subject"; // Import the missing type
import { ApiResponse } from "@infrastructure/apis/client";
// import { usePaginationController } from "../Pagination.controller";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useProfessorController = () => {
    const { getAllProfessors: { key: getAllProfessorsQueryKey, query: getAllProfessors }, getProfessors: { key: queryKey, query }, deleteProfessor: { key: deleteProfessorKey, mutation: deleteProfessor } } = useProfessorApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.

    const { data, isError, isLoading } = useQuery({
        queryKey: [getAllProfessorsQueryKey],
        queryFn: () => getAllProfessors()
    });
    console.log(data);

    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteProfessorKey],
        mutationFn: deleteProfessor
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    return { // Return the controller state and actions.
        //...tableController,
        tryReload,
        //pagedData: data?.response,
        allProfessorsData: data?.response,
        isError,
        isLoading,
        remove
    };
}