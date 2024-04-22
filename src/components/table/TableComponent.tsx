/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { IColumns, ITable } from "../../interfaces/table.interface";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputCustom } from "../inputCustom/InputCustom";

export const TableComponent: FC<ITable> = ({dataTable, columns}) => {
    const [dataFilter, setDataFilter] = useState<any[]>(dataTable);
    // const [selectedProducts, setSelectedProducts] = useState(null);

    useEffect(() => {
        
        console.log(dataTable);
        setDataFilter(dataTable);
    },[]);

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
        <div className="w-full bg-white flex flex-col items-end justify-center p-8 gap-4 rounded-xl shadow-2xl h-full">

            <div className="w-[18rem]">
                <InputCustom placeholder={'Buscar'} iconLeft={true} onChangeOuput={onFilter} icon={'search'}></InputCustom>
            </div>


            {/* dataKey="id"
            selection={selectedProducts} 
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            onSelectionChange={(e) => setSelectedProducts(e.value)} */}
            <DataTable 
            value={dataFilter} 
            scrollable 
            scrollHeight="20rem"
            paginator 
            rows={5} 

            emptyMessage="No se encontro nada"
            rowsPerPageOptions={[5, 10, 25, 50]} 
            className="w-full h-full bg-gray-700 text-black"
            tableStyle={{ width: '50rem', height: '100%', background: '#222' }}
            >
                {columns.map((col: IColumns, index: number) => (
                    <Column key={index} field={col.column} header={col.header}></Column>
                ))}
            </DataTable>
        </div>
    )
}
