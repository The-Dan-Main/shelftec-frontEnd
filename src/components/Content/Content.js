import Detailed from '../Detailed/Detailed'
import Landing from '../Landing/Landing'
import Products from '../Products/Products'
import Support from '../Support/Support'
import Cart from '../Cart/Cart'
import Compare from '../Compare/Compare'

import './Content.css'
import { Route, Routes } from 'react-router-dom';

export default function Content(props) {
    // console.log(props.isLoading)

    return (
        <div className='content-container'>
            
                <Routes>

                    <Route exact path='/' element={<Landing products={props.products} isLoading={props.isLoading}/>} />
                    <Route path='/products' element={<Products products={props.products} isLoading={props.isLoading}/>} />
                    <Route path='/products/:key' element={<Detailed isLoading={props.isLoading}/>} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/support' element={<Support />} />
                    <Route path='/compare' element={<Compare />} />
                    <Route path='*' element={<h1>404 - Not Found</h1>} />

                </Routes>

        </div>
    )
}