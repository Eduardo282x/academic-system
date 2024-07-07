import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import { getDataFileApi, postDataApi } from '../../backend/BaseAxios';
import { userToken } from '../../backend/authenticate';
import { UserData } from '../../interfaces/base-response.interface';

export interface IUploadForm {
    closeDialog: (file: File | null) => void;
    activityId: number | null | undefined;
    studentId: number;
    loadGrade: (grade: string | number) => void;
}

export interface FilesActivity {
    fileId: number;
    filePath: string;
    activityId: number;
    studentId: number;
}

export const UploadForm: React.FC<IUploadForm> = ({ closeDialog, activityId, studentId, loadGrade }) => {

    const [file, setFile] = React.useState<File | null>(null);
    const [existFile, setExistFile] = React.useState<FilesActivity>();
    const [grade, setGrade] = React.useState<string>('0');

    const user: UserData = userToken();

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
        const exist: FilesActivity = await postDataApi('activities/consult', bodyConsultFile);

        if (exist) {
            setExistFile(exist);
        }
    }

    const downloadFile = async () => {
        if (user.roles == 'Profesor' && existFile?.filePath != '') {
            const response = await getDataFileApi(`activities/${existFile?.fileId}`);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = existFile?.filePath as string; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    const consultGradeAPI = async () => {
        const bodyConsultFile = {
            activityId: activityId as number,
            studentId: studentId as number
        };
        const findGrade: string = await postDataApi('grades/get', bodyConsultFile);

        if (findGrade) {
            setGrade(findGrade as string);
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
        consultFileExistAPI();
        consultGradeAPI();
    }, [])

    return (
        <div className='p-4 flex items-center justify-center flex-col gap-5'>
            <h1 className='font-bold text-blue-700 text-2xl'>
                {user.roles == 'Estudiante' ? 'Sube aqui tu actividad' : 'Consulta de actividad'}
            </h1>
            {user.roles == 'Estudiante' && (
                <div>
                    {existFile != null ?
                        <p className='text-sm font-bold text-red-500'>Ya subiste un archivo a esta actividad</p> :
                        <p className='text-sm font-bold'>Solo se permiten archivos PDF no mayor a 2MB.</p>}
                </div>
            )}


            {existFile != null ?
                <div onClick={downloadFile} className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                    <div className='flex items-center justify-center gap-2'>
                        <span className="material-icons-round text-red-600">
                            {fileIcon(existFile.filePath)}
                        </span>
                        <span>{existFile.filePath}</span>
                    </div>
                </div>
                :
                <div {...getRootProps()} className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                    {user.roles == 'Estudiante' && <input {...getInputProps()} />}
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

            {user.roles == 'Estudiante' ? (
                <div className=''>
                    <div className="flex items-center justify-between w-full">
                        <span className='font-bold'>Su calificación:</span>
                        <span>{grade}/20</span>
                    </div>

                    <Button variant='contained' disabled={!file} onClick={() => closeDialog(file)}>Enviar</Button>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className="flex flex-col w-full items-center justify-center">
                        <label className='text-black ml-1'>Colocar nota</label>
                        <input type="number" min={0} max={20} value={grade} onChange={(event) => setGrade(event.target.value)} className="bg-gray-100 rounded-md w-[8rem] h-12 px-2 text-black outline-none" />
                    </div>
                    {Number(grade) > 0 && (
                        <p className='text-sm font-bold text-red-500'>Ya calificaste esta actividad</p>
                    )}
                    <Button variant='contained' disabled={Number(grade) > 0} className='my-2' onClick={() => loadGrade(grade)}>Enviar</Button>
                </div>
            )}
        </div>
    )
}
