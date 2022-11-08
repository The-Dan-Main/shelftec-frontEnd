import Detailed from '../Detailed/Detailed'
import Landing from '../Landing/Landing'
import Products from '../Products/Products'
import Support from '../Support/Support'
import Cart from '../Cart/Cart'
import Compare from '../Compare/Compare'

import './Content.css'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import SignIn from '../SignIn/SignIn'

export default function Content(props) {


    return (
        <div className='content-container'>
            {props.sidebar && <Sidebar filterProductsByCategory={props.filterProductsByCategory} />}
            <div className="content-wrapper">

                <Routes>

                    <Route exact path='/' element={<Landing products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar} getAllProducts={props.getAllProducts}/>} />
                    <Route path='/products' element={<Products products={props.products} isLoading={props.isLoading} setSidebar={props.setSidebar}/>} />
                    <Route path='/products/:key' element={<Detailed isLoading={props.isLoading} setSidebar={props.setSidebar}/>} />
                    <Route path='/cart' element={<Cart setSidebar={props.setSidebar}/>} />
                    <Route path='/support' element={<Support setSidebar={props.setSidebar}/>} />
                    <Route path='/compare' element={<Compare setSidebar={props.setSidebar}/>} />
                    <Route path='/sign-In' element={<SignIn  setSidebar={props.setSidebar} />} />
                    <Route path='*' element={<h1>404 - Not Found</h1>} />

                </Routes>
            </div>

        </div>
    )
}