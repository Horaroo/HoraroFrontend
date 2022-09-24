import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { validationSchema } from './validateShema'
import { Button, Dialog, IconButton } from '@mui/material'
import Pair from 'components/Pair/Pair'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
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
    const [loading, setLoading] = useState(false)
    const [openClearModal, setOpenClearModal] = useState(false)
    const [openCopyModal, setOpenCopyModal] = useState(false)
    const {
        handleSubmit,
        values,
        touched,
        errors,
        handleChange,
        setValues,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: {
            subject: '',
            type: '',
            teacher: '',
            audit: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const res = await Api.postShedule({
                    subject: values.subject,
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

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const res = await Api.getPair(
                    activeWeek,
                    activeDay,
                    numberPair,
                    user?.username
                )
                if (res.status === 200) {
                    const { audience, subject, teacher, type_pair } = res.data
                    if (JSON.stringify(res.data) !== '{}') {
                        setValues({
                            subject: subject,
                            audit: audience,
                            teacher,
                            type: type_pair,
                        })
                    } else {
                        resetForm()
                    }
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }
        }
        if (user) {
            getData()
        }
    }, [numberPair, activeDay, activeWeek, user, resetForm, setValues])

    const increment = () => {
        numberPair !== 6 && setNumberPair(numberPair + 1)
    }
    const decrement = () => {
        numberPair !== 1 && setNumberPair(numberPair - 1)
    }

    const handleClearPair = async () => {
        try {
            setLoading(true)
            Api.clearPair(activeWeek, activeDay, numberPair, user?.username)
            resetForm()
            setLoading(false)
            setOpenClearModal(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
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
            <Dialog
                maxWidth="lg"
                onClose={() => setOpenClearModal(false)}
                open={openClearModal}
            >
                <div className="shedule-item__modal">
                    <p className="shedule-item__modal-text">
                        Вы действительно хотите удалить пару?
                    </p>
                    <div className="shedule-item__modal-btns">
                        <Button
                            className="shedule-item__modal-btn"
                            color="primary"
                            onClick={handleClearPair}
                        >
                            Подтвердить
                        </Button>
                        <Button
                            className="shedule-item__modal-btn"
                            color="secondary"
                            onClick={() => setOpenClearModal(false)}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </Dialog>
            <form onSubmit={handleSubmit} className="shedule-item__form">
                <Pair
                    loading={loading}
                    pairTypes={pairTypes}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    username={user ? user.username : ''}
                    openCopyModal={openCopyModal}
                    closeClearModal={() => setOpenClearModal(false)}
                    closeCopyModal={() => setOpenCopyModal(false)}
                    setOpenClearModal={setOpenClearModal}
                    setOpenCopyModal={setOpenCopyModal}
                    activeWeek={activeWeek}
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
