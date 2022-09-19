import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'components/Autocomplete/Autocomplete'

const Pair = ({
    values,
    handleChange,
    errors,
    touched,
    pairTypes,
    loading,
    setOpenModal,
    setFieldValue,
    username,
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
                    disabled={loading}
                    color="secondary"
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    style={{ marginRight: '17px' }}
                >
                    Очистить
                </Button>
                <Button
                    disabled={loading}
                    color="primary"
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </div>
        </div>
    )
}
Pair.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    setOpenModal: PropTypes.func,
    setFieldValue: PropTypes.func,
    loading: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    pairTypes: PropTypes.array.isRequired,
    username: PropTypes.string,
}
export default Pair
