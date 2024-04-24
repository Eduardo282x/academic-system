import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/BaseAxios';
import { TableComponent } from '../../components/table/TableComponent';
import { body, columnsClassrooms, dataForm, validationClassrooms } from './classrooms.data';
import { IClassrooms } from '../../interfaces/classrooms.interface';
import { TableReturn } from '../../interfaces/table.interface';
import { FormComponent } from '../../components/form/FormComponent';
import { Dialog } from '@mui/material';
// import { IDataForm } from '../../interfaces/form.interface';

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

    const getStudents = async () => {
        await getDataApi('classrooms',).then((response: IClassrooms[]) => {
            setClassrooms(response)
        })
    }

    const openDialog = (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        setBodyClassrooms(action === 'edit' ? data : body)
        setTitle(action === 'edit' ? 'Actualizar' : 'Agregar');
        setAction(action === 'edit' ? 'editApi' : 'addApi');
        handleClickOpen()

        console.log(action);
        
        if(action == 'editApi' || action =='addApi'){
            handleClose()
        }
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {classrooms.length > 0 && (
                <TableComponent title="Salones" columns={columnsClassrooms} dataTable={classrooms} openForm={openDialog}></TableComponent>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} action={action} dataForm={dataForm} defaultValues={bodyClassrooms} validationSchema={validationClassrooms} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
