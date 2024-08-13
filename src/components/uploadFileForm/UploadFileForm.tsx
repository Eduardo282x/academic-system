import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import { userToken } from '../../backend/authenticate';
import { UserData } from '../../interfaces/base-response.interface';

export interface IUploadTopicForm {
    closeDialog: (file: File | null) => void;
}

export const UploadFileForm: React.FC<IUploadTopicForm> = ({ closeDialog }) => {

    const [file, setFile] = React.useState<File | null>(null);
    const user: UserData = userToken();

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 1 && acceptedFiles[0].size <= 2 * 1024 * 1024) {
            setFile(acceptedFiles[0]);
        }
    };

    const fileIcon = (fileName: string) => {
        if (/\.(jpg|jpeg|png|gif)$/i.test(fileName)) return 'image';
        if (/\.pdf$/i.test(fileName)) return 'picture_as_pdf';
        if (/\.docx?$/i.test(fileName)) return 'description';
        return 'picture_as_pdf'; // Icono genérico para otros tipos de archivos
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: 2 * 1024 * 1024,
        maxFiles: 1
    });

    return (
        <div className='p-4 flex items-center justify-center flex-col gap-5'>
            <h1 className='font-bold text-blue-700 text-2xl'>
                {user.roles == 'Profesor' ? 'Sube aquí el archivo' : 'Consulta de archivo'}
            </h1>
            {user.roles == 'Profesor' && (
                <div>
                    {file != null ?
                        <p className='text-sm font-bold text-red-500'>Ya subiste un archivo a esta actividad</p> :
                        <p className='text-sm font-bold'>Solo se permiten archivos PDF no mayor a 2MB.</p>}
                </div>
            )}


            <div {...getRootProps()} className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                {user.roles == 'Profesor' && <input {...getInputProps()} />}
                {file ? (
                    <div className='flex flex-wrap items-center justify-center gap-2'>
                        <span className="material-icons-round text-red-600">
                            {fileIcon(file.name)}
                        </span>

                        <span>{file.name}</span>
                        <span
                            onClick={() => setFile(null)}
                            className="material-icons-round text-red-600"
                        >
                            close
                        </span>
                    </div>
                ) : (
                    <div>
                        Arrastra y suelta un archivo aquí o haz clic para seleccionar uno
                    </div>
                )}
            </div>

            <Button variant='contained' disabled={!file} onClick={() => closeDialog(file)}>Enviar</Button>
        </div>
    )
}
