import { useEffect, useState } from "react"
import { getDataApi, postDataApi } from "../../backend/BaseAxios";
import { IActivities } from "../../interfaces/topics.interface";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IStudent } from "../../interfaces/users.interface";
import { UploadForm } from "../../components/uploadForm/UploadForm";
import { Dialog } from "@mui/material";

export const Activities = () => {

    const [activities, setActivities] = useState<IActivities[]>([]);
    const [studentsData, setStudentsData] = useState<IStudent[]>([]);

    const [activityId, setActivityId] = useState<number>(0);
    const [studentId, setStudentId] = useState<number>(0);

    const [expanded, setExpanded] = useState<string | false>(false);

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const sendFileData = () => {
        handleClose();
    }

    const sendGrade = async (grade: number | string) => {
        const bodyGrade = {
            studentId: studentId,
            activityId: activityId,
            score: Number(grade)
        }
        await postDataApi('grades',bodyGrade);
        handleClose();
    }

    const openConsultStudent = (student: IStudent, activity: IActivities) => {
        setActivityId(activity.activityId);
        setStudentId(student.studentId as number);
        handleClickOpen();
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getStudents = async () => {
        await getDataApi('users/students').then((response: IStudent[]) => {
            setStudentsData(response)
        })
    };
    const getActivities = async () => {
        await getDataApi('topics/activity').then((responseActivities: IActivities[]) => {
            setActivities(responseActivities)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getActivities();
        getStudents();
    }, []);


    return (
        <div className='cardDisplayComponent'>
            <div className="flex flex-col items-center justify-between my-2 w-full">
                <h1 className=' text-2xl font-bold'>Actividades</h1>

                <div className="w-full p-2 rounded-xl bg-white h-[80%] overflow-y-scroll text-black">
                    {activities && activities.map((act: IActivities, index: number) => (
                        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <span className="material-icons-round text-orange-600">task</span>
                                <span className='text-xl pl-2 text-orange-600 font-semibold maxIcon' >{act.activityName}</span>
                            </AccordionSummary>
                            <AccordionDetails>
                                {studentsData && studentsData.map((stu: IStudent, index: number) => (
                                    <div key={index} onClick={() => openConsultStudent(stu, act)} className="px-4 py-2 my-2 rounded-xl shadow-md" >
                                        <p>{stu.name} {stu.lastname}</p>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <UploadForm closeDialog={sendFileData} activityId={activityId} studentId={studentId} loadGrade={sendGrade}>

                </UploadForm>
            </Dialog>
        </div>
    )
}
