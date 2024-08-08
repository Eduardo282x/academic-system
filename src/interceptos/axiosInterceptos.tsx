/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import instance from '../env/axios-instance';

export const useAxiosInterceptos = () => {
    const [message, setMessage] = useState<string>('');
    const [severityType, setSeverityType] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    const isValidMessage = (msg: any) => {
        return typeof msg === 'string' && msg.trim().length > 2;
    };

    instance.interceptors.response.use(
        (response) => {
            if (['post', 'put', 'delete'].includes(response.config.method || '')) {
                const message = response.data?.message;
                if (isValidMessage(message)) {
                    setMessage(message || 'hola');
                    setSeverityType(true);
                    setOpen(true);
                }
            }
            return response;
        },
        (error) => {
            if (['post', 'put', 'delete'].includes(error.config.method || '')) {
                const message = error.response?.data?.message;
                if (isValidMessage(message)) {
                    setMessage(message);
                    setSeverityType(false);
                    setOpen(true);
                } else {
                    setMessage('Error en la operación');
                    setSeverityType(false);
                    setOpen(true);
                }
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

// export default useAxiosInterceptos;