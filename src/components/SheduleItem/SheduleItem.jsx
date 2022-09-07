import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'
import { IconButton } from '@material-ui/core'
import Pair from 'components/Pair/Pair'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { Api } from 'api/Api'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const SheduleItem = ({
    numberPair,
    activeWeek,
    setNumberPair,
    activeDay,
    pairTypes,
}) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState()
    console.log(user)
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await Api.getPair(
                    activeWeek,
                    activeDay,
                    numberPair,
                    user.username
                )
                if (res.status === 200) {
                    const { audience, subject, teacher, type_pair } = res.data
                    if (JSON.stringify(res.data) !== '{}') {
                        setValues({
                            title: subject,
                            audit: audience,
                            teacher,
                            type: type_pair,
                        })
                    } else {
                        setValues(initialValues)
                    }
                }

                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [numberPair, activeDay, activeWeek, user])

    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setErrors,
        setValues,
        initialValues,
    } = useFormik({
        initialValues: {
            title: '',
            type: '',
            teacher: '',
            audit: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const res = await Api.postShedule({
                    subject: values.title,
                    teacher: values.teacher,
                    type_pair: values.type,
                    audience: values.audit,
                    day: activeDay,
                    week: activeWeek,
                    number_pair: numberPair,
                    group: user.id,
                })
                toast.success('Данные сохранены!')
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.success('Данные не сохранены!')
            }
        },
        validationSchema: validationSchema,
    })

    const increment = () => {
        numberPair !== 6 && setNumberPair(numberPair + 1)
    }
    const decrement = () => {
        numberPair !== 1 && setNumberPair(numberPair - 1)
    }
    return (
        <div className="shedule-item">
            <div className="shedule-item__top">
                <IconButton onClick={decrement}>
                    <ArrowBack />
                </IconButton>
                <h2 className="shedule-item__title">Предмет-{numberPair}</h2>
                <IconButton onClick={increment}>
                    <ArrowForward />
                </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="shedule-item__form">
                <Pair
                    loading={loading}
                    pairTypes={pairTypes}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                />
            </form>
        </div>
    )
}
SheduleItem.propTypes = {
    pair: PropTypes.object,
    pairTypes: PropTypes.array,
    numberPair: PropTypes.number.isRequired,
    activeWeek: PropTypes.number.isRequired,
    activeDay: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func,
    setNumberPair: PropTypes.func,
}
export default SheduleItem
