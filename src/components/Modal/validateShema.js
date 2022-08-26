import * as yup from 'yup'

export const changePasswordShema = yup.object({
    password: yup
        .string('Введите новый пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
    newPassword: yup
        .string('Введите новый пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
})

export const deleteAccount = yup.object({
    password: yup
        .string('Введите новый пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
})
