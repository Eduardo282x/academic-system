import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import instance from '../env/axios-instance';

const useAxiosInterceptos = () => {
    const [message, setMessage] = useState<string>('');
    const [severityType, setSeverityType] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    instance.interceptors.response.use(
        (response) => {
            if (['post', 'put', 'delete'].includes(response.config.method || '')) {
                setMessage(response.data.message || 'Operación exitosa');
                setSeverityType(true);
                setOpen(true);
            }
            console.log(response);
            
            return response;
        },
        (error) => {
            if (['post', 'put', 'delete'].includes(error.config.method || '')) {
                setMessage(error.response?.data?.message || 'Error en la operación');
                setSeverityType(false);
                setOpen(true);
            }
            return Promise.reject(error);
        }
    );

    return (
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={severityType ? 'success' : 'error'} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default useAxiosInterceptos;