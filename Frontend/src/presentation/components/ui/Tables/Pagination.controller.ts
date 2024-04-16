import { useCallback, useState } from "react";

/**
 * This is the pagination controller hook that can be used to manage the state for paged entries.
 */
export const usePaginationController = () => {
    const [page, setPage] = useState(1); // Create a state for the current page.
    const [pageSize, setPageSize] = useState(10); // Create a state for the current page size.
    const [search, setSearch] = useState(""); // Create a state for the current page size.
    const setPagination = useCallback((search: string, newPage: number, newPageSize: number) => { // Create a callback to set both the current page and page size.
        setSearch(search);
        setPage(newPage);
        setPageSize(newPageSize);
    }, [setSearch, setPage, setPageSize]);

    return { // Return the state and its mutations.
        search,
        page,
        pageSize,
        setPage,
        setPageSize,
        setPagination,
        setSearch
    }
}