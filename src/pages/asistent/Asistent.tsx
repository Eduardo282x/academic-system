import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { IAssistent } from '../../interfaces/users.interface';
import { getDataApi, postDataApi } from '../../backend/BaseAxios';
import { Button } from '@mui/material';

export const Asistent = () => {

    const [studentsData, setStudentsData] = React.useState<IAssistent[]>([]);
    const [disableBtn, setDisableBtn] = React.useState<boolean>(false);

    const getStudents = async () => {
        await getDataApi('users/students').then((response: IAssistent[]) => {
            response.map((assis: IAssistent) => assis.assistent = false);
            setStudentsData(response)
        })
    };

    const getAttendance = async () => {
        await getDataApi('attendance').then((response: boolean) => {
            console.log(response);
            
            setDisableBtn(response);
        })
    }

    const handleToggle = (student: IAssistent) => () => {
        const copyStudent = [...studentsData];
        const findStudent = copyStudent.find(stu => stu.studentId == student.studentId)
        
        if(findStudent){
            findStudent.assistent = !findStudent.assistent
        }

        setStudentsData(copyStudent);
    };

    const saveAssistent = async () => {
        const copyStudent = [...studentsData];
        const sendAssistent = copyStudent.map((stu: IAssistent) => {
            return {
                studentId: stu.studentId,
                assistent: stu.assistent
            }
        })
        console.log('Asistencia guardada', sendAssistent);

        const save = await postDataApi('attendance', sendAssistent);
        console.log(save);
        

        getAttendance();
    }

    React.useEffect(() => {
        getStudents();
        getAttendance();
    }, []);

    return (
        <div className='cardDisplayComponent'>
            <div className="flex items-center justify-between my-2 w-full">
                <h1 className='text-2xl font-bold'>Asistencia</h1>
                <Button variant="contained" disabled={disableBtn} onClick={saveAssistent}>Guardar</Button>
            </div>
            {disableBtn && 
                <p className='my-2'>Ya se guardo la asistencia del dia de hoy.</p>
            }
            <List sx={{ width: '100%', bgcolor: 'background.paper',color:'black' }}>
                {studentsData && studentsData.map((stu: IAssistent, index: number) => {

                    return (
                        <ListItem
                            key={index}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(stu)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={stu.assistent}
                                        onChange={handleToggle(stu)}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText id={stu.name} primary={`${stu.name} ${stu.lastname}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    )
}
