import React, { useEffect, useState } from 'react'
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '../../backend/BaseAxios';
import { TableComponent } from '../../components/table/TableComponent';
import { body, columnsClassrooms, dataForm, validationClassrooms } from './classrooms.data';
import { IClassrooms } from '../../interfaces/classrooms.interface';
import { TableReturn } from '../../interfaces/table.interface';
import { FormComponent } from '../../components/form/FormComponent';
import { Dialog } from '@mui/material';
import { BaseResponse } from '../../interfaces/base-response.interface';
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

    const getClassrooms = async () => {
        await getDataApi('classrooms',).then((response: IClassrooms[]) => {
            console.log('data api: ',response);
            
            setClassrooms(response)
        })
    }

    const openDialog = (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        console.log(data);
        
        setBodyClassrooms(action === 'edit' ? data : body)
        setTitle(action === 'edit' ? 'Actualizar' : 'Agregar');
        setAction(action === 'edit' ? 'editApi' : 'addApi');
        if(action === 'add' || action === 'edit'){
            handleClickOpen()
        }

        if(action === 'delete'){
            deleteClassrooms(data)
        }

        if(action =='addApi'){
            addClassrooms(data)
            handleClose()
        }
        if(action =='editApi'){
            updateClassrooms(data)
            handleClose()
        }
    }

    const addClassrooms = async (newClassrooms: IClassrooms) => {
        await postDataApi('classrooms', newClassrooms).then((response: BaseResponse) => {
            console.log(response);
            getClassrooms()
        }).catch((err) => {
            console.log(err);
        })
    }
    const updateClassrooms = async (newClassrooms: IClassrooms) => {
        await putDataApi('classrooms', newClassrooms).then((response: BaseResponse) => {
            console.log(response);
            getClassrooms()
        }).catch((err) => {
            console.log(err);
        })
    }
    const deleteClassrooms = async (newClassrooms: IClassrooms) => {
        await deleteDataApi('classrooms', newClassrooms.classroomId).then((response: BaseResponse) => {
            console.log(response);
            getClassrooms()
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getClassrooms();
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
                <FormComponent title={title} keyWordId='classroomId' action={action} dataForm={dataForm} defaultValues={bodyClassrooms} validationSchema={validationClassrooms} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
