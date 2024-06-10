import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { IUsers } from '../../interfaces/users.interface';
import { getDataApi } from '../../backend/BaseAxios';
import { Button } from '@mui/material';

export const Asistent = () => {

    const [studentsData, setStudentsData] = React.useState<IUsers[]>([]);

    const getStudents = async () => {
        await getDataApi('users/students').then((response: IUsers[]) => {
            setStudentsData(response)
        })
    };


    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const saveAssistent = () => {
        console.log('Asistencia guardada');
    }

    React.useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className='cardDisplayComponent '>
            <div className="flex items-center justify-between my-2 w-full">
                <h1 className='text-2xl font-bold'>Asistencia</h1>
                <Button variant="contained" onClick={saveAssistent}>Guardar</Button>
            </div>
            <List sx={{ width: '100%', bgcolor: 'background.paper',color:'black' }}>
                {studentsData && studentsData.map((stu: IUsers, index: number) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem
                            key={index}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(index) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${stu.name} ${stu.lastname}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    )
}
