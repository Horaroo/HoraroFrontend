import { Button, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'components/Autocomplete/Autocomplete'
import CopyModal from 'components/CopyModal/CopyModal'

const Pair = ({
    values,
    handleChange,
    errors,
    touched,
    pairTypes,
    loading,
    setFieldValue,
    username,
    openCopyModal,
    closeClearModal,
    closeCopyModal,
    setOpenClearModal,
    setOpenCopyModal,
    activeWeek,
}) => {
    return (
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
                    loading={loading}
                    error={errors.teacher}
                    touch={touched.teacher}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    username={username}
                />
            </div>
            <div className="flex">
                <div className="pair__field">
                    <div className="pair__field-label">Тип</div>
                    <Select
                        style={{ marginRight: 'auto' }}
                        name="type"
                        className="pair__field-select auth__form-input"
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

                <div className="pair__field">
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
            </div>

            <div className="pair__btns">
                <Button
                    className="pair__btn"
                    disabled={loading}
                    color="error"
                    onClick={() => setOpenClearModal(true)}
                    variant="contained"
                >
                    Очистить
                </Button>
                <Button
                    className="pair__btn"
                    disabled={loading}
                    color="success"
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
                <Button
                    className="pair__btn"
                    onClick={() => setOpenCopyModal(true)}
                    disabled={loading}
                    color="primary"
                    variant="contained"
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
