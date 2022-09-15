import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const Pair = ({
    values,
    handleChange,
    errors,
    touched,
    pairTypes,
    loading,
    setOpenModal,
}) => {
    return (
        <div className="pair">
            <div className="pair__field">
                <div className="pair__field-label">Название предмета</div>
                <TextField
                    variant="outlined"
                    id="title"
                    name="title"
                    type="text"
                    className="auth__form-input"
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    size="small"
                    placeholder={loading ? 'Загрузка...' : ''}
                />
            </div>
            <div className="pair__field">
                <div className="pair__field-label">Преподаватель</div>
                <TextField
                    variant="outlined"
                    id="teacher"
                    name="teacher"
                    type="text"
                    className="auth__form-input"
                    value={values.teacher}
                    onChange={handleChange}
                    error={touched.teacher && Boolean(errors.teacher)}
                    helperText={touched.teacher && errors.teacher}
                    size="small"
                    placeholder={loading ? 'Загрузка...' : ''}
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
                    <TextField
                        variant="outlined"
                        id="audit"
                        name="audit"
                        type="text"
                        className="auth__form-input"
                        value={values.audit}
                        onChange={handleChange}
                        error={touched.audit && Boolean(errors.audit)}
                        helperText={touched.audit && errors.audit}
                        size="small"
                        placeholder={loading ? 'Загрузка...' : ''}
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
    loading: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    pairTypes: PropTypes.array.isRequired,
}
export default Pair
