import ReactDOM from 'react-dom/client'
import './assets/styles/_index.scss'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'views/Home'
import Login from 'components/Login'
import SignUp from 'components/SignUp'
import NotFound from 'views/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)
