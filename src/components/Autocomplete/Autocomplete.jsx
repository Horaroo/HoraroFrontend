import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'
import { Api } from 'api/Api'

const AutocompletCustom = ({
    name,
    type,
    value = '',
    touch,
    loading,
    error,
    handleChange,
    size = 'small',
    username,
    setFieldValue,
}) => {
    const [dataDropdown, setDataDropdown] = useState(null)
    const [openDropdown, setOpenDropdown] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await Api.getSheduleDetail({
                    username,
                    value,
                    type: name,
                })
                const results = data.results.length ? data.results : null
                setDataDropdown(results)
            } catch (error) {
                console.log(error)
            }
        }
        if (value.length) {
            getData()
        }
    }, [value, username, name])
    return (
        <div className="autocomplete">
            <TextField
                variant="outlined"
                name={name}
                type={type}
                className="auth__form-input autocomplete__input"
                value={value}
                onChange={handleChange}
                error={touch && Boolean(error)}
                size={size}
                placeholder={loading ? 'Загрузка...' : ''}
                autoComplete="off"
                onFocus={() => setOpenDropdown(true)}
                onBlur={() => setOpenDropdown(false)}
            />
            {dataDropdown && openDropdown && (
                <div className="autocomplete__dropdown">
                    <ul className="autocomplete__list">
                        {dataDropdown.map((item, index) => (
                            <li
                                key={index}
                                className="autocomplete__item"
                                name={name}
                                value={item.name}
                                onMouseDown={() =>
                                    setFieldValue(name, item.name)
                                }
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
AutocompletCustom.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    username: PropTypes.string.isRequired,
    size: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
    touch: PropTypes.bool,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
}
export default React.memo(AutocompletCustom)
