import { useState, useEffect } from "react";
import { getDataApi } from "../../../backend/BaseAxios";
import { TableComponent } from "../../../components/table/TableComponent";
import { columnsUsers, configTableUsers, body, validationUsers, dataForm } from "./users.data";
import { IUsers } from "../../../interfaces/users.interface";
import { TableReturn } from '../../../interfaces/table.interface';
import { FormComponent } from '../../../components/form/formComponent';
import { Dialog } from '@mui/material';
import { BaseApi, BaseApiReturn } from '../../../backend/BaseAPI';

export const Users = () => {
    const [usersData, setUsersData] = useState<IUsers[]>([]);

    const [bodyUsers, setBodyUsers] = useState<IUsers>(body);
    const [title, setTitle] = useState<string>('Agregar');
    const [action, setAction] = useState<string>('addApi');
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getStudents = async () => {
        await getDataApi('users/teachers',).then((response: IUsers[]) => {
            setUsersData(response)
        })
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        const responseBaseApi: BaseApiReturn = await BaseApi(action,data, body ,'id','users/teachers');
        setBodyUsers(responseBaseApi.body as IUsers)
        setTitle(responseBaseApi.title);
        setAction(responseBaseApi.action);
        if(responseBaseApi.open){handleClickOpen()}
        if(responseBaseApi.close){handleClose()}
        if(responseBaseApi){getStudents()}
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {usersData.length > 0 && (
                <TableComponent title="Profesores" columns={columnsUsers} dataTable={usersData} configTable={configTableUsers} openForm={openDialog}></TableComponent>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} keyWordId='id' action={action} dataForm={dataForm} defaultValues={bodyUsers} validationSchema={validationUsers} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
