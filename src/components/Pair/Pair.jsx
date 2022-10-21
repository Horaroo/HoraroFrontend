import { Button, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'components/Autocomplete/Autocomplete'
import CopyModal from 'components/CopyModal/CopyModal'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const Pair = ({
    values,
    handleChange,
    setValues,
    errors,
    touched,
    pairTypes,
    loading,
    setFieldValue,
    username,
    openCopyModal,
    closeCopyModal,
    setOpenClearModal,
    setOpenCopyModal,
    activeWeek,
}) => {
    const locale = 'ru'

    return (
        <div className="pair__container">
            <div className="pair">
                <div className="pair__field">
                    <div className="pair__field-label">Название предмета</div>
                    <Autocomplete
                        name="subject"
                        type="text"
                        value={values.subject}
                        loading={loading}
                        error={errors.subject}
                        touch={touched.subject}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        username={username}
                    />
                </div>

                <div className="pair__field">
                    <div className="pair__field-label">Преподаватель</div>
                    <Autocomplete
                        name="teacher"
                        type="text"
                        value={values.teacher}
                        className="form__field"
                        loading={loading}
                        error={errors.teacher}
                        touch={touched.teacher}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        username={username}
                    />
                </div>

                <div className="flex">
                    <div
                        className="pair__field mr-10"
                        style={{ width: '200px' }}
                    >
                        <div className="pair__field-label">Аудитория</div>
                        <Autocomplete
                            name="audit"
                            type="text"
                            value={values.audit}
                            loading={loading}
                            error={errors.audit}
                            touch={touched.audit}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            username={username}
                        />
                    </div>
                    <div className="pair__field">
                        <div className="pair__field-label">Тип</div>
                        <Select
                            name="type"
                            className="form__select "
                            onChange={handleChange}
                            value={values.type}
                            error={touched.type && Boolean(errors.type)}
                            size="small"
                        >
                            {pairTypes.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>

                        {touched.type && Boolean(errors.type) && (
                            <div
                                className="text--error "
                                style={{ position: 'relative', top: '-30px' }}
                            >
                                Обязательно
                            </div>
                        )}
                    </div>
                </div>

                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={locale}
                >
                    <div className="flex">
                        <div
                            className="pair__field pair__field--datetime"
                            style={{ marginRight: 17 }}
                        >
                            <div className="pair__field-label">Начало</div>
                            <TimePicker
                                value={values.startDate}
                                onChange={(value) =>
                                    setValues((prevState) => ({
                                        ...prevState,
                                        startDate: value,
                                    }))
                                }
                                className="datetimepicker"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </div>
                        <div className="pair__field pair__field--datetime">
                            <div className="pair__field-label">Окончание</div>
                            <TimePicker
                                value={values.endDate}
                                onChange={(value) =>
                                    setValues((prevState) => ({
                                        ...prevState,
                                        endDate: value,
                                    }))
                                }
                                className="datetimepicker"
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
            <div className="pair__btns">
                <Button
                    className="pair__btn"
                    disabled={loading}
                    color="error"
                    onClick={() => setOpenClearModal(true)}
                    variant="contained"
                    size="large"
                >
                    Очистить
                </Button>
                <Button
                    className="pair__btn"
                    disabled={loading}
                    color="success"
                    type="submit"
                    variant="contained"
                    size="large"
                >
                    Сохранить
                </Button>
                <Button
                    className="pair__btn"
                    onClick={() => setOpenCopyModal(true)}
                    disabled={loading}
                    color="primary"
                    variant="contained"
                    size="large"
                >
                    Скопировать
                </Button>
                <CopyModal
                    open={openCopyModal}
                    handleClose={closeCopyModal}
                    activeWeek={activeWeek}
                    username={username}
                />
            </div>
        </div>
    )
}
Pair.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    setValues: PropTypes.func,
    setFieldValue: PropTypes.func,
    loading: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    pairTypes: PropTypes.array.isRequired,
    username: PropTypes.string,
    openCopyModal: PropTypes.bool,
    closeClearModal: PropTypes.func,
    closeCopyModal: PropTypes.func,
    setOpenClearModal: PropTypes.func,
    setOpenCopyModal: PropTypes.func,
    activeWeek: PropTypes.number.isRequired,
}
export default Pair
