import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext } from 'react'

import Detailed from '../Detailed/Detailed'
import Products from '../Products/Products'
import Sidebar from '../Sidebar/Sidebar'
import Compare from '../Compare/Compare'
import Landing from '../Landing/Landing'
import Support from '../Support/Support'
import SignIn from '../SignIn/SignIn'
import Login from '../Login/Login'
import User from '../User/User'
import Cart from '../Cart/Cart'

import { AuthContext } from '../../contexts/AuthContext'

import './Content.css'

export default function Content(props) {

    return (
        <div className='content-container'>
            {props.sidebar && <Sidebar filterProductsByCategory={props.filterProductsByCategory} />}
            <div className="content-wrapper">
                <Routes>
                    <Route exact path='/' element={<Landing products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar} getAllProducts={props.getAllProducts} />} />
                    <Route path='/products/:key' element={<Detailed isLoading={props.isLoading} setSidebar={props.setSidebar} />} />
                    <Route path='/products' element={<Products products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar} />} />
                    <Route path='/compare' element={<Compare setSidebar={props.setSidebar} />} />
                    <Route path='/support' element={<Support setSidebar={props.setSidebar} />} />
                    <Route path='/sign-In' element={<SignIn setSidebar={props.setSidebar} />} />
                    <Route path='/Login' element={<Login setSidebar={props.setSidebar} />} />
                    <Route element={<ProtectedRoutes />} >
                        <Route path='/cart' element={<Cart setSidebar={props.setSidebar} />} />
                        <Route path='/user' element={<User setSidebar={props.setSidebar} />} />
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