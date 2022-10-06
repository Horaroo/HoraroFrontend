import ReactDOM from 'react-dom/client'
import './assets/styles/_index.scss'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'app/providers/AuthProvider'
import ThemeProvider from 'app/providers/ThemeProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
)
