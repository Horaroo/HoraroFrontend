import { createContext } from 'react'

export const ThemeContext = createContext({
    scrollFixed: true,
    hasContainer: true,
    setScrollFixed: () => {},
    setHasContainer: () => {},
})
