import { useTableController } from "../Table.controller";
import { useAssignmentApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";
import { AssignmentUpdateDTO } from "@infrastructure/apis/client/models/AssignmentUpdateDTO";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useAssignmentTableController = () => {
    const { getAssignments: { key: queryKey, query }, deleteAssignment: { key: deleteAssignmentKey, mutation: deleteAssignment }, updateAssignment: { key: updateAssignmentKey, mutation: updateAssignment } } = useAssignmentApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { search, page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, search, page, pageSize],
        queryFn: () => query({search, page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.

    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteAssignmentKey],
        mutationFn: deleteAssignment
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const { mutateAsync: updateMutation } = useMutation({
        mutationKey: [updateAssignmentKey],
        mutationFn: updateAssignment
    });
    const update = useCallback(
        (assignmentUpdateDTO: AssignmentUpdateDTO) => updateMutation(assignmentUpdateDTO).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, updateMutation, queryKey]);

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        update
    };
}