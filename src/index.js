import ReactDOM from 'react-dom/client'
import './assets/styles/_index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'providers/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
