import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'contexts/ThemeContext'
function ThemeProvider(props) {
    const [scrollFixed, setScrollFixed] = useState(true)
    // const handleScrollFixed = (bool) => {
    //     setScrollFixed(bool)
    // }
    const contextValue = useMemo(
        () => ({
            scrollFixed,
            setScrollFixed,
        }),
        [scrollFixed]
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
