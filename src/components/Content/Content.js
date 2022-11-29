import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext } from 'react'

import Orders from '../UserRelated/Orders/Orders';
import ChangePassword from '../UserRelated/ChangePassword/ChangePassword';
import Detailed from '../Detailed/Detailed'
import Products from '../Products/Products'
import Compare from '../Compare/Compare'
import Landing from '../Landing/Landing'
import Support from '../Support/Support'
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import User from '../User/User'
import Cart from '../Cart/Cart'

import { AuthContext } from '../../contexts/AuthContext'

import './Content.css'
import ForgotPassword from '../ForgotPassword/ForgotPassword';

export default function Content(props) {

    return (
        <div className='content-container'>
            <div className="content-wrapper">
            {props.isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                <Routes>
                    <Route exact path='/' element={<Landing products={props.products} isLoading={props.isLoading}  getAllProducts={props.getAllProducts} filterProductsByCategory={props.filterProductsByCategory} />} />
                    <Route path='/products/:key' element={<Detailed isLoading={props.isLoading}  />} />
                    <Route path='/products' element={<Products products={props.products} isLoading={props.isLoading}  />} />
                    <Route path='/compare' element={<Compare  />} />
                    <Route path='/support' element={<Support />} />

                    <Route element={<LoginRoutes />}>
                        <Route path='/sign-Up' element={<SignUp />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/forgottenPassword' element={<ForgotPassword />} />
                    </Route>

                    <Route element={<ProtectedRoutes />} >
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/user/resetPassword' element={<ChangePassword />} />
                        <Route path='/user/orders' element={<Orders />} />
                    </Route>
                    <Route path='*' element={<h1>404 - Not Found</h1>} />
                </Routes>
            </div>
        </div>
    )
}

const ProtectedRoutes = () => {
    const { auth } = useContext(AuthContext);
    return (
        auth ? <Outlet /> : <Navigate to='/login' replace />
    );
};

const LoginRoutes = () => {
    const { auth } = useContext(AuthContext);
    return (
        !auth ? <Outlet /> : <Navigate to='/User' replace />
    );
};