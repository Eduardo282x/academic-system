import { useEffect, useState } from "react";
import { getDataApi } from "../../../backend/BaseAxios"
import { IUsers } from "../../../interfaces/users.interface";
import { TableComponent } from "../../../components/table/TableComponent";
import { body, columnsStudents, configTableStudents, dataForm, validationStudents } from "./students.data";
import { actionsValid, ConfigTable, IColumns, TableReturn } from "../../../interfaces/table.interface";
import Dialog from '@mui/material/Dialog';
import { IDataForm, IOptions } from "../../../interfaces/form.interface";
import { IClassrooms } from "../../../interfaces/classrooms.interface";
import { BaseApiReturn, BaseApi } from "../../../backend/BaseAPI";
import { FormComponent } from "../../../components/form/formComponent";
import { userToken } from "../../../backend/authenticate";
import { UserData } from "../../../interfaces/base-response.interface";

export const Students = () => {
    const [studentsData, setStudentsData] = useState<IUsers[]>([]);
    const [columns, setColumns] = useState<IColumns[]>(columnsStudents);
    const [configTable, setConfigTable] = useState<ConfigTable>(configTableStudents);
    const [dataFormStudents, setDataFormStudents] = useState<IDataForm[]>(dataForm);
    const [bodyStudents, setBodyStudents] = useState<IUsers>(body);
    const [title, setTitle] = useState<string>('Agregar');
    const [action, setAction] = useState<actionsValid>('addApi');
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const getStudents = async () => {
        await getDataApi('users/students').then((response: IUsers[]) => {
            setStudentsData(response)
        })
    };

    useEffect(()=> {
        const user: UserData = userToken();
        if (user.roles == "Profesor") {
            let copyColumns = [...columns];
            const copyConfig = {...configTable}
            copyColumns = copyColumns.filter(col => col.column == 'name' || col.column == 'lastname' || col.column == 'username')
            setColumns(copyColumns);
            copyConfig.addBtn = false;
            setConfigTable(copyConfig);
        }
    },[])

    const getClassrooms = async () => {
        const copyDataForm: IDataForm[] = dataForm;
        const findClassroomsForm = copyDataForm.find(form => form.name == 'classroomId');
        await getDataApi('classrooms').then((response: IClassrooms[]) => {
            if (findClassroomsForm) {
                findClassroomsForm.options = response.map(classrooms => {
                    const option: IOptions = {
                        label: classrooms.grade,
                        value: classrooms.classroomId
                    }
                    return option
                })
            }

            setDataFormStudents(copyDataForm)
        })
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        if(data){
            data.classroomId = data.classroomId.toString()
        }
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, body, 'userId', 'users/students');
        if (responseBaseApi.open) { handleClickOpen() }
        if (responseBaseApi.close) { handleClose() }

        setBodyStudents(responseBaseApi.body as IUsers)
        setTitle(responseBaseApi.title);
        setAction(responseBaseApi.action);

        if (responseBaseApi) { getStudents(); }
    }

    useEffect(() => {
        getStudents();
        getClassrooms();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {studentsData.length > 0 && (
                <div >
                    <TableComponent title="Alumnos" configTable={configTable} columns={columns} dataTable={studentsData} openForm={openDialog}></TableComponent>
                </div>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} action={action} dataForm={dataFormStudents} defaultValues={bodyStudents} validationSchema={validationStudents} onSubmitForm={openDialog} keyWordId={"userId"}></FormComponent>
            </Dialog>
        </div>
    )
}
