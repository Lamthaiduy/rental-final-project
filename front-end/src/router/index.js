import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ApplicationContainer from '../containers/AppContainer';
import Default from '../pages';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
export default function ApplicationRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ApplicationContainer>
                    <Default />
                </ApplicationContainer>} />
                <Route path='/home' element={<ApplicationContainer>
                    <Home />
                </ApplicationContainer>} />
                <Route path='/login' element={<ApplicationContainer>
                    <Login />
                </ApplicationContainer>} />
                <Route path='/register' element={<ApplicationContainer>
                    <Register />
                </ApplicationContainer>} />
            </Routes>
        </BrowserRouter>
    )
}