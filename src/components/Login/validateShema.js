import * as yup from 'yup'
const usernameRegExp = /^[A-z]{1}[A-z\d]+$/
export const validationSchema = yup.object({
    username: yup
        .string('Введите ваш Логин')
        .matches(usernameRegExp, 'Введен не корректный Логин')
        .required('Обязательно'),
    password: yup
        .string('Введите ваш пароль')
        .min(6, 'Пароль должен иметь не меньше 6 символов')
        .max(15, 'Пароль должен иметь не больше 15 символов')
        .required('Обязательно'),
})
