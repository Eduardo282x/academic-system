import { z } from "zod"
import { IDataForm } from "../../interfaces/form.interface"
import { NewTopics } from "../../interfaces/topics.interface"

export const body: NewTopics = {
    topicId: 0,
    topicName: '',
    topicDescription: '',
}

export const validationStudents: object = z.object({
    topicName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    topicDescription: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
})

export const dataForm: IDataForm[] = [
    {
        label: 'Titulo',
        value: '',
        type: 'text',
        name: 'topicName',
    },
    {
        label: 'Descripción',
        value: '',
        type: 'textArea',
        name: 'topicDescription',
    }
]