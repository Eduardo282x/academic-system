import React, { useEffect, useState } from 'react'
import { FilesTopics, IActivities, ITopics, NewTopics } from '../../interfaces/topics.interface';
import { getDataApi, getDataFileApi, postFilesDataApi } from '../../backend/BaseAxios';
import './topics.css';
import { Button, Divider, IconButton } from '@mui/material';
import { UserData } from '../../interfaces/base-response.interface';
import { userToken } from '../../backend/authenticate';
import Dialog from '@mui/material/Dialog';
import { body, bodyActivities, dataForm, dataFormActivity, validationAtivity, validationStudents } from './topics.data';
import { actionsValid, TableReturn } from '../../interfaces/table.interface';
import { FormComponent } from '../../components/form/formComponent';
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { UploadForm } from '../../components/uploadForm/UploadForm';
import { ColorButton } from '../../components/buttonCustom/ButtonCustom';
import { useNavigate, useParams } from 'react-router-dom';
import { ISubjects } from '../../interfaces/subjects.interface';
import { UploadFileForm } from '../../components/uploadFileForm/UploadFileForm';

export const Topics = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState<ISubjects>();
    const [topics, setTopics] = useState<ITopics[]>([]);
    const [topicsSelected, setTopicsSelected] = useState<ITopics>();
    const [showBtnAdd, setShowBtnAdd] = useState<boolean>(false);
    const [showBtnEdit, setShowBtnEdit] = useState<boolean>(false);
    const [activity, setActivity] = useState<IActivities>();

    const [topicId, setTopicId] = useState<number>(0);
    const { id } = useParams();

    const user: UserData = userToken();

    const [bodyTopics, setBodyTopics] = useState<NewTopics>(body);
    const [title, setTitle] = useState<string>('Agregar nuevo tema');
    const [action, setAction] = useState<actionsValid>('addApi');

    const [bodyActivity, setBodyActivity] = useState<IActivities>(bodyActivities);
    const [titleActivity, setTitleActivity] = useState<string>('Agregar nueva Actividad');
    const [actionActivity, setActionActivity] = useState<actionsValid>('addApi');

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openActivity, setOpenActivity] = useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);
    const handleClickOpenActivity = () => setOpenActivity(true);

    const handleCloseUpload = () => setOpenUpload(false);
    const handleClose = () => setOpen(false);
    const handleCloseActivity = () => setOpenActivity(false);

    const sendFileData = async (file: File | null) => {
        await postFilesDataApi(`activities?activityId=${activity?.activityId}&studentId=${user.id}`, file as File);
        handleClose();
    }

    const sendFileTopicsData = async (file: File | null) => {
        await postFilesDataApi(`topics/file/${topicsSelected?.topicIc}`, file as File);
        handleCloseUpload();
    }

    const getSubject = async (subjectId: string | undefined) => {
        await getDataApi(`subjects/${subjectId}`).then((responseSubject: ISubjects) => {
            setSubject(responseSubject)
        }).catch((err) => console.log(err))
    }
    const getTopics = async (subjectId: string | undefined) => {
        await getDataApi(`topics/${subjectId}`).then((responseTopics: ITopics[]) => {
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

    const addActivity = (topicId: number) => {
        setTopicId(topicId);
        openDialogActivities({
            data: {},
            action: 'add'
        })
        handleClickOpenActivity();
    }

    const addTopic = () => {
        openDialog({
            data: {},
            action: 'add'
        })
        handleClickOpen();
    }

    const editActivity = (topic: IActivities, topicId: number) => {
        setTopicId(topicId);
        openDialogActivities({
            data: topic,
            action: 'edit'
        })
    }

    const editTopic = (topic: ITopics) => {
        openDialog({
            data: topic,
            action: 'edit'
        })
    }

    const uploadFileTopic = (topic: ITopics) => {
        setTopicsSelected(topic);
        setOpenUpload(true);
    }

    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        data.subjectId = Number(id);
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, body, 'topicIc', 'topics');
        if (responseBaseApi.open) { handleClickOpen() }
        if (responseBaseApi.close) { handleClose() }

        setBodyTopics(responseBaseApi.body as ITopics)
        setAction(responseBaseApi.action);
        setTitle(`${responseBaseApi.title} Tema`);

        if (responseBaseApi) { getTopics(id); }
    }

    const openDialogActivities = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        data.topicIc = topicId;
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, bodyActivities, 'activityId', 'topics/activity');
        if (responseBaseApi.open) { handleClickOpenActivity() }
        if (responseBaseApi.close) { handleCloseActivity() }

        setBodyActivity(responseBaseApi.body as IActivities)
        setActionActivity(responseBaseApi.action);
        setTitleActivity(`${responseBaseApi.title} Actividad`);

        if (responseBaseApi) { getTopics(id); }
    }

    const downloadFileTopic = async (fileTopic: FilesTopics) => {
        const response = await getDataFileApi(`topics/file/${fileTopic.fileId}`);

        const url = window.URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileTopic.filePath as string; // Cambia el nombre del archivo según tus necesidades
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const fileIcon = (fileName: string) => {
        if (/\.(jpg|jpeg|png|gif)$/i.test(fileName)) return 'image';
        if (/\.pdf$/i.test(fileName)) return 'picture_as_pdf';
        if (/\.docx?$/i.test(fileName)) return 'description';
        return 'picture_as_pdf'; // Icono genérico para otros tipos de archivos
    };

    const goBack = () => {
        navigate('/cursos')
    }

    useEffect(() => {
        getTopics(id);
        getSubject(id);
        validateRol();
    }, []);


    return (
        <div className='cardDisplayComponent'>
            <div className="flex items-center justify-between my-2 w-full">
                <Button variant="contained" onClick={goBack}>
                    <span className="material-icons-round">arrow_back</span>
                </Button>
                <h1 className=' text-2xl font-bold'>{subject?.subjectName}</h1>
                {showBtnAdd &&
                    <Button variant="contained" onClick={addTopic}>
                        <span className="material-icons-round">add</span>
                    </Button>
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
                                        <div>
                                            <IconButton color="primary" onClick={() => uploadFileTopic(top)}>
                                                <span className="material-icons-round ">upload</span>
                                            </IconButton>

                                            <IconButton color="primary" onClick={() => editTopic(top)}>
                                                <span className="material-icons-round ">edit</span>
                                            </IconButton>
                                        </div>
                                    )}
                                </div>
                                <p className='px-2 mt-4 leading-5 text-justify'>{top.topicDescription}</p>
                                <div className="flex flex-wrap mt-5 gap-5">
                                    {top.FilesTopics && top.FilesTopics.map((fil: FilesTopics, indexFile: number) => (
                                        <div key={indexFile} className='flex items-center justify-center gap-5' onClick={() => downloadFileTopic(fil)}>
                                            <span className="material-icons-round text-red-600">
                                                {fileIcon(fil.filePath)}
                                            </span>
                                            <p >{fil.filePath}</p>
                                        </div>
                                    ))}
                                </div>
                                {showBtnEdit && (
                                    <div className='flex items-center justify-center  w-full'>
                                        <ColorButton className='w-[80%] !p-2 mx-auto !mt-6 !mb-0' onClick={() => addActivity(top.topicIc)}>Agregar actividad</ColorButton>
                                    </div>
                                )}
                            </div>
                            <Divider />

                            {top.activities.length > 0 && top.activities.map((activities: IActivities, indexAct: number) => (
                                <div key={indexAct}>
                                    <div className="py-4" onClick={() => uploadFile(activities)}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex">
                                                <span className="material-icons-round text-orange-600">task</span>
                                                <span className='text-2xl pl-2 text-orange-600 font-semibold maxIcon' >{activities.activityName}</span>
                                            </div>

                                            {showBtnEdit && (
                                                <IconButton color="primary" onClick={() => editActivity(activities, top.topicIc)}>
                                                    <span className="material-icons-round text-orange-600">edit</span>
                                                </IconButton>
                                            )}
                                        </div>
                                        <p className='px-2 text-justify mt-4 leading-5'>{activities.activityDescription}</p>
                                    </div>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>


            </div>

            <Dialog
                open={openUpload}
                onClose={handleCloseUpload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <UploadFileForm closeDialog={sendFileTopicsData}>

                </UploadFileForm>
            </Dialog>

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

            {/* //Abrir formulario de actividades */}
            <Dialog
                open={openActivity}
                onClose={handleCloseActivity}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title={titleActivity}
                    action={actionActivity}
                    dataForm={dataFormActivity}
                    defaultValues={bodyActivity}
                    validationSchema={validationAtivity}
                    onSubmitForm={openDialogActivities}
                    keyWordId={"activityId"}></FormComponent>
            </Dialog>
        </div>
    )
}
