import React, { useEffect, useState } from 'react'
import { IActivities, ITopics, NewTopics } from '../../interfaces/topics.interface';
import { getDataApi,  postFilesDataApi } from '../../backend/BaseAxios';
import './topics.css';
import { Button, Divider, IconButton } from '@mui/material';
import { UserData } from '../../interfaces/base-response.interface';
import { userToken } from '../../backend/authenticate';
import Dialog from '@mui/material/Dialog';
import { body, dataForm, validationStudents } from './topics.data';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { FormComponent } from '../../components/form/formComponent';
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { UploadForm } from '../../components/uploadForm/UploadForm';
import { ColorButton } from '../../components/buttonCustom/ButtonCustom';

export const Topics = () => {
    const [topics, setTopics] = useState<ITopics[]>([]);
    const [showBtnAdd, setShowBtnAdd] = useState<boolean>(false);
    const [showBtnEdit, setShowBtnEdit] = useState<boolean>(false);
    const [activity, setActivity] = useState<IActivities>();

    const user: UserData = userToken();

    const [bodyTopics, setBodyTopics] = useState<NewTopics>(body);
    const [title, setTitle] = useState<string>('Agregar nuevo tema');
    const [action, setAction] = useState<actionsValid>('addApi');

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const sendFileData = async (file: File | null) => {
        await postFilesDataApi(`activities?activityId=${activity?.activityId}&studentId=${user.id}`,file as File);
        handleClose();
    }

    const getTopics = async () => {
        await getDataApi('topics').then((responseTopics: ITopics[]) => {
            setTopics(responseTopics)
        }).catch((err) => console.log(err))
    }

    const validateRol = () => {
        if (user.roles !== "Estudiante") {
            setShowBtnAdd(true);
            setShowBtnEdit(true);
        }
    }

    const uploadFile = (activity: IActivities) => {
        setActivity(activity);
        if (user.roles == "Estudiante") {
            handleClickOpen();
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
                    <Button variant="contained" onClick={addTopic}>Agregar tema</Button>
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
                                            <span className="material-icons-round ">edit</span>
                                        </IconButton>
                                    )}
                                </div>
                                <p className='px-2 mt-4 leading-5 text-justify'>{top.topicDescription}</p>

                                {showBtnEdit && (
                                    <div className='flex items-center justify-center  w-full'>
                                        <ColorButton className='w-[80%] !p-2 mx-auto !mt-6 !mb-0' onClick={addTopic}>Agregar actividad</ColorButton>
                                    </div>
                                )}
                            </div>
                            <Divider />

                            {top.activities.length > 0 && (
                                <>
                                    <div className="py-4" onClick={() => uploadFile(top.activities[0])}>
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
                {user.roles !== "Estudiante" ?
                    <FormComponent
                        title={title}
                        action={action}
                        dataForm={dataForm}
                        defaultValues={bodyTopics}
                        validationSchema={validationStudents}
                        onSubmitForm={openDialog}
                        keyWordId={"topicIc"}></FormComponent>

                    :
                    <UploadForm closeDialog={sendFileData} activityId={activity?.activityId} studentId={user.id} loadGrade={handleClose}>

                    </UploadForm>
                }
            </Dialog>
        </div>
    )
}
