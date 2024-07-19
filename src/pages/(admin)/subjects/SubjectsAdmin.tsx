import { useEffect, useState } from 'react'
import { TableComponent } from '../../../components/table/TableComponent';
import { getDataApi } from '../../../backend/BaseAxios';
import { body, columnsSubjects, configTableSubjects, dataForm, validationSubjects } from './subjects.data';
import { ISubjects, ISubjectsApi } from '../../../interfaces/subjects.interface';
import { Dialog } from '@mui/material';
import { FormComponent } from '../../../components/form/formComponent';
import { BaseApi, BaseApiReturn } from '../../../backend/BaseAPI';
import { actionsValid, TableReturn } from '../../../interfaces/table.interface';
import { IClassrooms } from '../../../interfaces/classrooms.interface';

export const SubjectsAdmin = () => {
    const [subjects, setSubjects] = useState<ISubjects[]>([]);
    const [bodyClassrooms, setBodyClassrooms] = useState<ISubjectsApi>(body);
    const [title, setTitle] = useState<string>('Agregar');
    const [action, setAction] = useState<actionsValid>('addApi');
    const [open, setOpen] = useState<boolean>(false);

    const getClassrooms = async () => {
        await getDataApi('classrooms').then((response: IClassrooms[]) => {
            const findClassroomForm = dataForm.find(form => form.name == 'classroomId');

            if (findClassroomForm) {
                findClassroomForm.options = response.map((classroom: IClassrooms) => {
                    return {
                        label: classroom.grade,
                        value: classroom.classroomId
                    }
                })
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getSubjets = async () => {
        await getDataApi('subjects',).then((response: ISubjects[]) => {
            setSubjects(response)
        })
    }


    const openDialog = async (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;

        if(data){
            data.classroomId = Number(data.classroomId);
        }

        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, body, 'subjectId', 'subjects');
        setBodyClassrooms(responseBaseApi.body as ISubjects)
        setTitle(responseBaseApi.title);
        setAction(responseBaseApi.action);
        if (responseBaseApi.open) { handleClickOpen() }
        if (responseBaseApi.close) { handleClose() }
        if (responseBaseApi) { getSubjets() }
    }

    useEffect(() => {
        getSubjets();
        getClassrooms();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {subjects.length > 0 && (
                <TableComponent title="Materias" openForm={openDialog} configTable={configTableSubjects} columns={columnsSubjects} dataTable={subjects}></TableComponent>
            )}


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} keyWordId='subjectId' action={action} dataForm={dataForm} defaultValues={bodyClassrooms} validationSchema={validationSubjects} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
