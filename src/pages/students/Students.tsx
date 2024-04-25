import { useEffect, useState } from "react";
import { getDataApi } from "../../backend/BaseAxios"
import { IUsers } from "../../interfaces/users.interface";
import { TableComponent } from "../../components/table/TableComponent";
import { body, columnsStudents, dataForm, validationStudents } from "./students.data";
import { TableReturn } from "../../interfaces/table.interface";
import Dialog from '@mui/material/Dialog';
import { FormComponent } from "../../components/form/FormComponent";
import { IDataForm, IOptions } from "../../interfaces/form.interface";
import { IClassrooms } from "../../interfaces/classrooms.interface";

export const Students = () => {
    const [studentsData, setStudentsData] = useState<IUsers[]>([]);
    const [dataFormStudents, setDataFormStudents] = useState<IDataForm[]>(dataForm);
    const [bodyStudents, setBodyStudents] = useState<IUsers>(body);
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
        await getDataApi('users/students').then((response: IUsers[]) => {
            setStudentsData(response)
        })
    }

    const getClassrooms = async () => {
        const copyDataForm: IDataForm[] = dataForm;
        const findClassroomsForm = copyDataForm.find(form => form.name == 'classrooms');
        await getDataApi('classrooms').then((response: IClassrooms[]) => {
            if(findClassroomsForm){
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

    const openDialog = (tableReturn: TableReturn) => {
        const { data, action } = tableReturn;
        console.log(data);
        console.log(action);

        setBodyStudents(action === 'edit' ? data : body)
        setTitle(action === 'edit' ? 'Actualizar' : 'Agregar');
        setAction(action === 'edit' ? 'editApi' : 'addApi');
        handleClickOpen()

        console.log(action);
        
        if(action == 'editApi' || action =='addApi'){
            handleClose()
        }

        handleClickOpen()
    }

    useEffect(() => {
        getStudents();
        getClassrooms();
    }, [])

    return (
        <div className="cardDisplayComponent">
            {studentsData.length > 0 && (
                <div >
                    <TableComponent title="Estudiantes" columns={columnsStudents} dataTable={studentsData} openForm={openDialog}></TableComponent>
                </div>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent title={title} action={action} dataForm={dataFormStudents} defaultValues={bodyStudents} validationSchema={validationStudents} onSubmitForm={openDialog}></FormComponent>
            </Dialog>
        </div>
    )
}
