import Home from 'views/Home'
import Login from 'components/Login'
import SignUp from 'components/SignUp'
import NotFound from 'views/NotFound'
import { Route, Routes } from 'react-router-dom'
import Layout from 'components/Layout'
import PrivateRoute from 'routes/PrivateRoute'
import ResetPassword from 'components/ResetPassword'
function App() {
    return (
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
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route
                path="/reset_password/:uid/:token"
                element={<ResetPassword isSetNewPass={true} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
