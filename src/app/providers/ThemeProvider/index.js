import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'contexts/ThemeContext'
function ThemeProvider(props) {
    const [scrollFixed, setScrollFixed] = useState(true)
    const [hasContainer, setHasContainer] = useState(true)

    const contextValue = useMemo(
        () => ({
            scrollFixed,
            hasContainer,
            setHasContainer,
            setScrollFixed,
        }),
        [scrollFixed, hasContainer]
    )

    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}
ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
}
export default ThemeProvider
