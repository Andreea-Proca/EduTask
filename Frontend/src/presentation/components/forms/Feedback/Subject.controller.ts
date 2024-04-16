// import { useTableController } from "../Table.controller";
import { useSubjectApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
// import { SubjectDTOList } from "@infrastructure/types/subject"; // Import the missing type
import { ApiResponse } from "@infrastructure/apis/client";
// import { usePaginationController } from "../Pagination.controller";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useSubjectController = () => {
    const { getAllSubjects: { key: getAllSubjectsQueryKey, query: getAllSubjects }, getSubjects: { key: queryKey, query }, deleteSubject: { key: deleteSubjectKey, mutation: deleteSubject } } = useSubjectApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
   // const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    // const { data, isError, isLoading } = useQuery({
    //     queryKey: [queryKey],
    //     queryFn: () => query
    //     // queryKey: [allSubjectsQueryKey], // Cheia interogării pentru toate materiile
    //     // queryFn: () => getAllSubjects() // Funcția pentru a obține toate materiile
    // }); // Retrieve the table page from the backend via the query hook.

    // const { data: allSubjectsData, isError: isAllSubjectsError, isLoading: isAllSubjectsLoading} = useQuery({
    //     queryKey: [allSubjectsQueryKey], // Cheia interogării pentru toate materiile
    //     queryFn: () => getAllSubjects() // Funcția pentru a obține toate materiile
    // });

    // const { data: allSubjectsApiResponse, isError, isLoading } = useQuery({
    //     queryKey: [allSubjectsQueryKey],
    //     queryFn: () => getAllSubjects().then(apiResponse => apiResponse.value()).then(response => response.response || [])
    // });

    
    const { data, isError, isLoading } = useQuery({
        queryKey: [getAllSubjectsQueryKey],
        queryFn: () => getAllSubjects()
    });
    console.log(data);
    // const allSubjectsData = allSubjectsApiResponse;

    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteSubjectKey],
        mutationFn: deleteSubject
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    //const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.

    return { // Return the controller state and actions.
        //...tableController,
        tryReload,
        //pagedData: data?.response,
        allSubjectsData: data?.response,
        isError,
        isLoading,
        remove
    };
}