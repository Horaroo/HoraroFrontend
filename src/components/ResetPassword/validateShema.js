import * as yup from 'yup'

export const setNewPassSchema = yup.object({
    password: yup
        .string('Введите новый пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
})
export const resetPassSchema = yup.object({
    email: yup
        .string()
        .email('Введен не корректный адрес электроной почты')
        .required('Обязательно'),
})
