import ReactDOM from 'react-dom/client'
import './assets/styles/_index.scss'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'app/providers/AuthProvider'
import OptionProvider from 'app/providers/ThemeProvider'
import { ThemeProvider } from '@mui/material/styles'
import { customTheme } from './shared/theme/customTheme'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthProvider>
            <OptionProvider>
                <ThemeProvider theme={customTheme}>
                    <App />
                </ThemeProvider>
            </OptionProvider>
        </AuthProvider>
    </BrowserRouter>
)
