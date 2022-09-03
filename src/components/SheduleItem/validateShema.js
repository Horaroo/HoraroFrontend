import * as yup from 'yup'
const usernameRegExp = /^[A-z]{1}[A-z\d]+$/
export const validationSchema = yup.object({
    title: yup
        .string('Введите ваш Логин')
        .matches(usernameRegExp, 'Введен не корректное название предмета')
        .required('Обязательно'),
    type: yup
        .string('Введите ваш пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
    teacher: yup
        .string()
        .email('Введен не корректный адрес электроной почты')
        .required('Обязательно'),
})
