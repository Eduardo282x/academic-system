import { z } from "zod"
import { IDataForm } from "../../interfaces/form.interface"
import { IActivities, NewTopics } from "../../interfaces/topics.interface"

export const body: NewTopics = {
    topicIc: 0,
    subjectId: 0,
    topicName: '',
    topicDescription: '',
};

export const validationStudents: object = z.object({
    topicName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    topicDescription: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

export const dataForm: IDataForm[] = [
    {
        label: 'Titulo del Tema',
        value: '',
        type: 'text',
        name: 'topicName',
    },
    {
        label: 'Descripción del Tema',
        value: '',
        type: 'textArea',
        name: 'topicDescription',
    }
];

export const bodyActivities: IActivities = {
    activityId: 0,
    topidIc: 0,
    activityName: '',
    activityDescription: '',
};

export const validationAtivity: object = z.object({
    activityName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    activityDescription: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
});

export const dataFormActivity: IDataForm[] = [
    {
        label: 'Titulo de la Actividad',
        value: '',
        type: 'text',
        name: 'activityName',
    },
    {
        label: 'Descripción de la Actividad',
        value: '',
        type: 'textArea',
        name: 'activityDescription',
    }
];

