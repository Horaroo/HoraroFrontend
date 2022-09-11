import Home from 'views/Home'
import Login from 'components/Login/Login'
import SignUp from 'components/SignUp/SignUp'
import NotFound from 'views/NotFound'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'
import PrivateRoute from 'routes/PrivateRoute'
import ResetPassword from 'components/ResetPassword/ResetPassword'
import 'react-toastify/dist/ReactToastify.css'
import About from 'views/About'
import Activate from 'views/Activate'
import { ToastContainer } from 'react-toastify'
function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/reset_password" element={<ResetPassword />} />
                <Route
                    path="/reset_password/:uid/:token"
                    element={<ResetPassword isSetNewPass={true} />}
                />
                <Route path="/activate/:uid/:token" element={<Activate />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </>
    )
}

export default App
