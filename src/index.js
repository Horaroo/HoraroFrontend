import ReactDOM from 'react-dom/client'
import './assets/styles/_index.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'providers/AuthProvider'
import ThemeProvider from 'providers/ThemeProvider'

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
