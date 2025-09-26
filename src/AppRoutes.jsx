import { Route, Routes } from 'react-router'
import Navbar from './Components/Navbar'
import { Login } from './Components/Login'
import { Registration } from './Components/Registration'
import HomePage from './Components/Home'
import AdminPage from './Components/Admin'
import UserSettingsPage from './Components/UserSettings'
import { UserDataContext } from './Components/GlobalData'
import { ForgetPassword } from './Components/ForgetPassword'
import { useContext } from 'react'

export function AppRoutes() {

    const { user } = useContext(UserDataContext)

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                <Route path='/forgetPassword' element={<ForgetPassword />} />

                <Route element={<Navbar />} >
                    <Route path='/user' element={<HomePage />} />
                    {
                        user?.email == "admin123@gmail.com" && <Route path='/admin' element={<AdminPage />} />
                    }
                    <Route path='/settings' element={<UserSettingsPage />} />
                </Route>

            </Routes>

        </>
    )
}
