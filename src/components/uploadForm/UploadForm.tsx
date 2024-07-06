import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import { postDataApi } from '../../backend/BaseAxios';

export interface IUploadForm {
    closeDialog: (file: File | null) => void;
    activityId: number | null | undefined;
    studentId: number;
}

export const UploadForm: React.FC<IUploadForm> = ({ closeDialog, activityId, studentId }) => {

    const [file, setFile] = React.useState<File | null>(null);
    const [existFile, setExistFile] = React.useState<string>('');

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 1 && acceptedFiles[0].size <= 2 * 1024 * 1024) {
            setFile(acceptedFiles[0]);
        }
    };

    const consultFileExistAPI = async () => {
        const bodyConsultFile = {
            activityId: activityId as number,
            studentId: studentId as number
        };
        const exist: string = await postDataApi('activities/consult', bodyConsultFile);

        if (exist) {
            setExistFile(exist as string);
        }
    }

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

    useEffect(() => {
        consultFileExistAPI()
    }, [])

    return (
        <div className='p-4 flex items-center justify-center flex-col gap-5'>
            <h1 className='font-bold text-blue-700 text-2xl'>Sube aqui tu actividad</h1>
            {existFile != '' ?
                <p className='text-sm font-bold text-red-500'>Ya subiste un archivo a esta actividad</p> :
                <p className='text-sm font-bold'>Solo se permiten archivos PDF no mayor a 2MB.</p>}

            {existFile != '' ?
                <div className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                    <div className='flex items-center justify-center gap-2'>
                        <span className="material-icons-round text-red-600">
                            {fileIcon(existFile)}
                        </span>
                        <span>{existFile}</span>
                    </div>
                </div>
                :
                <div {...getRootProps()} className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                    <input {...getInputProps()} />
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
            }

            <div className="flex items-center justify-between w-full">
                <span className='font-bold'>Su calificación:</span>
                <span>0/20</span>
            </div>

            <Button variant='contained' disabled={!file} onClick={() => closeDialog(file)}>Enviar</Button>
        </div>
    )
}
