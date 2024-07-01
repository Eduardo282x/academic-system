import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';

export interface IUploadForm {
    closeDialog: () => void;
}

export const UploadForm: React.FC<IUploadForm> = ({closeDialog}) => {

    const [files, setFiles] = React.useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Asegúrate de no exceder el límite de archivos y el tamaño máximo
        if (files.length + acceptedFiles.length <= 2 && acceptedFiles.every(file => file.size <= 5242880)) {
            setFiles(prevFiles => [...prevFiles, ...acceptedFiles.filter(file => /\.(docx?|pdf$|jpg|jpeg|png|gif)$/i.test(file.name))]);
        }
        console.log(files);

    }, [files.length]);

    const fileIcon = (fileName: string) => {
        if (/\.(jpg|jpeg|png|gif)$/i.test(fileName)) return 'image';
        if (/\.pdf$/i.test(fileName)) return 'picture_as_pdf';
        if (/\.docx?$/i.test(fileName)) return 'description';
        // Añade más tipos de archivo si es necesario
        return '📁'; // Icono genérico para otros tipos de archivos
    };

    const removeFile = (file: File) => {
        let copyFiles = [...files];
        copyFiles = copyFiles.filter(fi => fi !== file);

        setFiles(copyFiles);
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 2
    });

    return (
        <div className='p-4 flex items-center justify-center flex-col gap-5'>
            <h1 className=' font-bold text-blue-700 text-2xl'>Sube aqui tu actividad</h1>

            <div {...getRootProps()} className='border-dashed border-2 border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center w-full'>
                <input {...getInputProps()} />
                {files.length > 0 ?

                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className='flex items-center justify-between w-full'>
                                <span className='material-icons-round text-blue-600'>{fileIcon(file.name)}</span>
                                {file.name}
                                <span onClick={() => removeFile(file)} className='material-icons-round text-red-600'>close</span>
                            </li>
                        ))}
                    </ul> :
                    <div>Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos</div>
                }
            </div>

            <Button variant='contained' disabled={files.length<=0} onClick={closeDialog}>Enviar</Button>
        </div>
    )
}
