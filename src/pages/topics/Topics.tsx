import React, { useEffect, useState } from 'react'
import { ITopics } from '../../interfaces/topics.interface';
import { getDataApi } from '../../backend/BaseAxios';
import './topics.css';
import { Button, Divider, IconButton } from '@mui/material';
import { UserData } from '../../interfaces/base-response.interface';
import { userToken } from '../../backend/authenticate';
import Dialog from '@mui/material/Dialog';
import { body, dataForm, validationStudents } from './topics.data';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { FormComponent } from '../../components/form/formComponent';
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';

export const Topics = () => {
    const [topics, setTopics] = useState<ITopics[]>([]);
    const [showBtnAdd, setShowBtnAdd] = useState<boolean>(false);
    const [showBtnEdit, setShowBtnEdit] = useState<boolean>(false);

    const [bodyTopics, setBodyTopics] = useState<ITopics>(body);
    const [title, setTitle] = useState<string>('Agregar nuevo tema');
    const [action, setAction] = useState<actionsValid>('addApi');

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const getTopics = async () => {
        await getDataApi('topics').then((responseTopics: ITopics[]) => {
            setTopics(responseTopics)
        }).catch((err) => console.log(err))
    }

    const validateRol = () => {
        const user: UserData = userToken();
        if (user.roles !== "Estudiante") {
            setShowBtnAdd(true);
            setShowBtnEdit(true);
        }
    }

    const editTopic = (topic: ITopics) => {
        openDialog({
            data: topic,
            action: 'edit'
        })
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;

        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, body, 'topicIc', 'topics');
        if (responseBaseApi.open) { handleClickOpen() }
        if (responseBaseApi.close) { handleClose() }

        setBodyTopics(responseBaseApi.body as ITopics)
        setAction(responseBaseApi.action);
        setTitle(responseBaseApi.title);

        if (responseBaseApi) { getTopics(); }
    }

    useEffect(() => {
        getTopics();
        validateRol();
    }, []);


    return (
        <div className='cardDisplayComponent'>
            <div className="m-1 w-full h-auto p-2 rounded-xl bg-white text-black">
                <div className='mb-2'>
                    {topics && topics.map((top: ITopics, index: number) => (
                        <div key={index}>
                            <div className="py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="material-icons-round text-blue-600">menu_book</span>
                                        <span className='text-2xl pl-2 underline'>{top.topicName}</span>
                                    </div>

                                    {showBtnEdit && (
                                        <IconButton color="primary" onClick={() => editTopic(top)}>
                                            <span className="material-icons-round ">edit</span>
                                        </IconButton>
                                    )}
                                </div>
                                <p className='pl-4 mt-4 leading-5'>{top.topicDescription}</p>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

                {showBtnAdd &&
                    <div className='w-full flex items-center justify-center'>
                        <Button variant="contained" onClick={handleClickOpen}>Agregar nuevo</Button>
                    </div>
                }
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            
                <FormComponent 
                title={title} 
                action={action} 
                dataForm={dataForm} 
                defaultValues={bodyTopics} 
                validationSchema={validationStudents} 
                onSubmitForm={openDialog} 
                keyWordId={"topicIc"}></FormComponent>
            </Dialog>
        </div>
    )
}
