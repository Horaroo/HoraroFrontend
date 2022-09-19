import * as yup from 'yup'
export const validationSchema = yup.object({
    subject: yup.string('Введите названия предмета').required('Обязательно'),
    audit: yup.string('Введите аудиторию').required('Обязательно'),
    type: yup.string('Введите тип предмета').required('Обязательно'),
    teacher: yup
        .string('Введите преподователя предмета')
        .required('Обязательно'),
})
