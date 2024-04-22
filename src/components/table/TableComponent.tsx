/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { IColumns, ITable } from "../../interfaces/table.interface";
import { InputCustom } from "../inputCustom/InputCustom";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, IconButton } from "@mui/material";
import { Actions, StyledTableCell } from "./table.data";
import './table.css'

export const TableComponent: FC<ITable> = ({ dataTable, columns, title }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataFilter, setDataFilter] = useState<any[]>(dataTable);
    // const [selectedProducts, setSelectedProducts] = useState(null);

    const sendData = (data: any, action: string) => {
        console.log(data);
        console.log(action);

    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        console.log(dataTable);
        setDataFilter(dataTable);
    }, []);

    const onFilter = (inputValue: string) => {

        if (dataTable && dataTable.length > 0) {
            const filterColumn = columns.filter((col: IColumns) => col.filterOption == true);
            const filtersKey = filterColumn.map((col: IColumns) => col.column);
            const filterSearch = filtersKey
                .map((col: string) =>
                    dataTable.filter((fil) =>
                        fil[col].toString().toLowerCase().includes(inputValue.toLowerCase().toString())
                    )
                )
                .flat();
            const reduceFilter = new Set(filterSearch);
            const result = [...reduceFilter];
            setDataFilter(result);
        }
    };

    return (
        <div className="w-[80rem] bg-white flex flex-col items-center justify-center p-8 gap-4 rounded-xl shadow-2xl h-full">
            <div className="flex items-center justify-between w-full">
                <div className=" text-black text-2xl">
                    {title}
                </div>
                <div className="w-[18rem]">
                    <InputCustom placeholder={'Buscar'} iconLeft={true} onChangeOuput={onFilter} icon={'search'}></InputCustom>
                </div>
            </div>

            <div className="tableScroll">
                <TableContainer component={Paper} className="table">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((col: IColumns, ind: number) => (
                                    <StyledTableCell key={ind}>{col.header}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataFilter
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index} sx={{ background: '#e5e7eb' }}>
                                        {columns.map((ro: IColumns, key: number) => (
                                            <TableCell
                                                key={key}
                                            // sx={{ width: ro.width ? ro.width : 100 }}
                                            >
                                                {ro.type == "text" ? row[ro.column] : ""}
                                                {ro.type == "date" ? row[ro.column] : ""}
                                                {/* {ro.type == "time" ? ParseTimeString(row[ro.column]) : ""} */}
                                                {/* {ro.type == "date" ? parseDate(row[ro.column]) : ""}  */}
                                                {ro.type == "icon" && (
                                                    <IconButton
                                                        className={`editBtn  `}
                                                        onClick={() => sendData(row, ro.action as Actions)}
                                                    >
                                                        <span className={`material-icons-round ${ro.color}`}>{ro.icon}</span>
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="flex items-center justify-end w-full">
                {dataFilter.length > 5 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={dataFilter.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={"Paginas"}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </div>
        </div>
    )
}
