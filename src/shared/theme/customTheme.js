import { createTheme, experimental_sx as sx } from '@mui/material/styles'

export const customTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: sx({
                    '& .MuiInputLabel-root': {
                        color: 'white',
                        fontSize: '18px',
                        '&.Mui-focused': { color: 'white' },
                    },

                    '& .MuiInputBase-input': {
                        color: 'white',
                    },

                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused': {
                            '& > fieldset': {
                                color: 'white',
                                borderColor: 'white',
                            },
                        },
                        '& > fieldset': {
                            color: 'white',
                            borderColor: 'white',
                        },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        '& > fieldset': {
                            color: 'white',
                            borderColor: 'white',
                        },
                    },
                }),
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '& .MuiButton-root': {},
                },
            },
        },
    },
})
