import Detailed from '../Detailed/Detailed'
import Landing from '../Landing/Landing'
import Products from '../Products/Products'
import Support from '../Support/Support'
import Cart from '../Cart/Cart'
import Compare from '../Compare/Compare'

import './Content.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import SignIn from '../SignIn/SignIn'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Login from '../Login/Login'
import User from '../User/User'

export default function Content(props) {


    return (
        <div className='content-container'>
            {props.sidebar && <Sidebar filterProductsByCategory={props.filterProductsByCategory} />}
            <div className="content-wrapper">
                <Routes>
                    <Route exact path='/' element={<Landing products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar} getAllProducts={props.getAllProducts} />} />
                    <Route path='/products' element={<Products products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar} />} />
                    <Route path='/products/:key' element={<Detailed isLoading={props.isLoading} setSidebar={props.setSidebar} />} />
                    <Route path='/compare' element={<Compare setSidebar={props.setSidebar} />} />
                    <Route path='/support' element={<Support setSidebar={props.setSidebar} />} />
                    <Route path='/Login' element={<Login setSidebar={props.setSidebar} />} />
                    <Route path='*' element={<h1>404 - Not Found</h1>} />
                    <Route path='/sign-In' element={<SignIn setSidebar={props.setSidebar} />} />
                    <Route element={<ProtectedRoutes />} >
                        <Route path='/cart' element={<Cart setSidebar={props.setSidebar} />} />
                        <Route path='/user' element={<User setSidebar={props.setSidebar} />} />
                    </Route>
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