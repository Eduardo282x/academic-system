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

    const addTopic = () => {
        openDialog({
            data: {},
            action: 'add'
        })
        handleClickOpen();
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
            <div className="flex items-center justify-between my-2 w-full">
                <h1 className=' text-2xl font-bold'>Geometria</h1>
                {showBtnAdd &&
                    <Button variant="contained" onClick={addTopic}>Agregar nuevo</Button>
                }
            </div>
            <div className="w-full p-2 rounded-xl bg-white h-[80%] overflow-y-scroll text-black">
                <div className='mb-2'>
                    {topics && topics.map((top: ITopics, index: number) => (
                        <div key={index}>
                            <div className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className='flex'>
                                        <span className="material-icons-round text-blue-600 maxIcon" >menu_book</span>
                                        <span className='text-2xl pl-2 text-blue-600 font-semibold'>{top.topicName}</span>
                                    </div>

                                    {showBtnEdit && (
                                        <IconButton color="primary" onClick={() => editTopic(top)}>
                                            <span className="material-icons-round ">add</span>
                                            <span className="material-icons-round ">edit</span>
                                        </IconButton>
                                    )}
                                </div>
                                <p className='px-2 mt-4 leading-5 text-justify'>{top.topicDescription}</p>
                            </div>
                            <Divider />

                            {top.activities.length > 0 && (
                                <>
                                    <div className="py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex">
                                                <span className="material-icons-round text-orange-600">task</span>
                                                <span className='text-2xl pl-2 text-orange-600 font-semibold maxIcon' >{top.activities[0].activityName}</span>
                                            </div>

                                            {showBtnEdit && (
                                                <IconButton color="primary" onClick={() => editTopic(top)}>
                                                    <span className="material-icons-round text-orange-600">edit</span>
                                                </IconButton>
                                            )}
                                        </div>
                                        <p className='px-2 text-justify mt-4 leading-5'>{top.activities[0].activityDescription}</p>
                                    </div>
                                    <Divider />
                                </>
                            )}
                        </div>
                    ))}
                </div>


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
