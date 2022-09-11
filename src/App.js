import Shedule from 'views/Shedule'
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
import Home from 'views/Home'
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/shedule"
                        element={
                            <PrivateRoute>
                                <Shedule />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset_password" element={<ResetPassword />} />
                    <Route
                        path="/reset_password/:uid/:token"
                        element={<ResetPassword isSetNewPass={true} />}
                    />
                    <Route
                        path="/activate/:uid/:token"
                        element={<Activate />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </>
    )
}

export default App
