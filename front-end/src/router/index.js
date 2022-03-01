import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminContainer from '../containers/AdminContainer';
import ApplicationContainer from '../containers/AppContainer';
import Default from '../pages';
import Admin from '../pages/admin';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import AdminProtectedRouter from './AdminRouter'
import UnauthRouter from './UnauthRouter';
import AuthRouter from './AuthRouter';
export default function ApplicationRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ApplicationContainer>
                    <Default />
                </ApplicationContainer>} />
                <Route path="/dashboard" element={
                    <AdminProtectedRouter>
                        <Admin />
                    </AdminProtectedRouter>
                } />
                <Route path='/home' element={<AuthRouter>
                    <Home />
                </AuthRouter>} />
                <Route path='/login' element={<UnauthRouter>
                    <Login />
                </UnauthRouter>} />
                <Route path='/register' element={<UnauthRouter>
                    <Register />
                </UnauthRouter>} />
            </Routes>
        </BrowserRouter>
    )
}