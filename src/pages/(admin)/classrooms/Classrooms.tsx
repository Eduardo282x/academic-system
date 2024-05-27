import { useEffect, useState } from 'react'
import { getDataApi} from '../../../backend/BaseAxios';
import { TableComponent } from '../../../components/table/TableComponent';
import { body, columnsClassrooms, configTableClassrooms, dataForm, validationClassrooms } from './classrooms.data';
import { IClassrooms } from '../../../interfaces/classrooms.interface';
import { TableReturn } from '../../../interfaces/table.interface';
import { FormComponent } from '../../../components/form/formComponent';
import { Dialog } from '@mui/material';
import { BaseApi, BaseApiReturn } from '../../../backend/BaseAPI';

export const Classrooms = () => {
    const [classrooms, setClassrooms] = useState<IClassrooms[]>([]);
    // const [dataFormClassrooms, setDataFormClassrooms] = useState<IDataForm[]>(dataForm);
    const [bodyClassrooms, setBodyClassrooms] = useState<IClassrooms>(body);
    const [title, setTitle] = useState<string>('Agregar');
    const [action, setAction] = useState<string>('addApi');
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getClassrooms = async () => {
        await getDataApi('classrooms').then((response: IClassrooms[]) => {
            setClassrooms(response)
        })
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;

        const responseBaseApi: BaseApiReturn = await BaseApi(action,data,body,'classroomId','classrooms');
        setBodyClassrooms(responseBaseApi.body as IClassrooms)
        setTitle(responseBaseApi.title);
        setAction(responseBaseApi.action);
        if(responseBaseApi.open){handleClickOpen()}
        if(responseBaseApi.close){handleClose()}
        if(responseBaseApi){getClassrooms()}
    }

    useEffect(() => {
        getClassrooms();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {classrooms.length > 0 && (
                <TableComponent title="Salones" columns={columnsClassrooms} configTable={configTableClassrooms} dataTable={classrooms} openForm={openDialog}></TableComponent>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} keyWordId='classroomId' action={action} dataForm={dataForm} defaultValues={bodyClassrooms} validationSchema={validationClassrooms} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
