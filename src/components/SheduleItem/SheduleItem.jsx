import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'
import { IconButton, TextField } from '@material-ui/core'
import Pair from 'components/Pair/Pair'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
const SheduleItem = ({ numberPair, setNumberPair }) => {
    const [loading, setLoading] = useState()
    const { handleSubmit, values, touched, errors, handleChange, setErrors } =
        useFormik({
            initialValues: {
                title: '',
                type: '',
                teacher: '',
                audit: '',
            },
            onSubmit: async (values) => {
                try {
                    setLoading(true)
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                }
            },
            validationSchema: validationSchema,
        })

    const increment = () => {
        numberPair !== 4 && setNumberPair(numberPair + 1)
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

            <form className="shedule-item__form">
                <Pair
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
    numberPair: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func,
    setNumberPair: PropTypes.func,
}
export default SheduleItem
