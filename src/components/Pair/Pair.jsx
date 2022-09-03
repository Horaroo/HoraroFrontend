import {
    Button,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
const TYPE_PAIR = [
    { id: 1, label: 'Лекция' },
    { id: 2, label: 'Практика' },
]
const Pair = ({ values, handleChange, errors, touched }) => {
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
                />
            </div>
            <div className="pair__field">
                <div className="pair__field-label">Преподаватель</div>
                <TextField
                    variant="outlined"
                    id="title"
                    name="title"
                    type="text"
                    className="auth__form-input"
                    value={values.teacher}
                    onChange={handleChange}
                    error={touched.teacher && Boolean(errors.teacher)}
                    helperText={touched.teacher && errors.teacher}
                    size="small"
                />
            </div>
            <div className="pair__field">
                <div className="pair__field-label">Тип</div>
                <Select
                    style={{ marginRight: 'auto' }}
                    className="pair__field-select auth__form-input"
                    defaultValue={1}
                >
                    <MenuItem value="1">Лекция</MenuItem>
                    <MenuItem value="2">Практика</MenuItem>
                    <MenuItem value="3">Лабораторная</MenuItem>
                </Select>
            </div>

            <div className="pair__field">
                <div className="pair__field-label">Аудитория</div>
                <TextField
                    variant="outlined"
                    id="title"
                    name="title"
                    type="text"
                    className="auth__form-input"
                    value={values.audit}
                    onChange={handleChange}
                    error={touched.audit && Boolean(errors.audit)}
                    helperText={touched.audit && errors.audit}
                    size="small"
                />
            </div>
            <Button color="primary" type="submit" variant="contained">
                Сохранить
            </Button>
        </div>
    )
}
Pair.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
}
export default Pair
