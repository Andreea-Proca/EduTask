import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useSubjectTableController } from "./SubjectTable.controller";
import { SubjectDTO, UserRoleEnum } from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { SubjectAddDialog } from "../../Dialogs/SubjectAddDialog";
import { SubjectEditDialog } from "../../Dialogs/SubjectEditDialog";
import { useAppSelector } from "@application/store";
import { useState } from "react";
import { dateToDateStringOrNull } from "@infrastructure/utils/dateUtils";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof SubjectDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
        { key: "createdAt", name: formatMessage({ id: "globals.createdAt" }) },
        { key: "professor", name: formatMessage({ id: "globals.professor" }) }
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: SubjectDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

const renders: { [key: string]: (value: any) => string | null } = {
    professor: (value) => value.name, 
    createdAt: dateToDateStringOrNull,
};

/**
 * Creates the user table.
 */
export const SubjectTable = () => {
    const { userId: ownSubjectId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangeSearch, handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useSubjectTableController(); // Use the controller hook.
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.

    const [searchText, setSearchText] = useState('');

    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isProf = useOwnUserHasRole(UserRoleEnum.Professor);
    const isStudent = useOwnUserHasRole(UserRoleEnum.Student);

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        {!isStudent && <SubjectAddDialog /> }
        
        <br />
        <div  style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
                size="small"
                variant="outlined" 
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    handleChangeSearch(e, e.target.value);
                }}
                placeholder={formatMessage({ id: "globals.search" })}
            />
        
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}
        </div>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{isUndefined(renders[keyValue.key]) ? keyValue.value : renders[keyValue.key](keyValue.value)}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {entry.id !== ownSubjectId && <IconButton color="error" onClick={() => remove(entry.id || '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>}
                                {entry.id !== ownSubjectId &&  <SubjectEditDialog id={entry.id ?? ''}/>}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}