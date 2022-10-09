import Detailed from '../Detailed/Detailed'
import Landing from '../Landing/Landing'
import Products from '../Products/Products'
import Support from '../Support/Support'
import Cart from '../Cart/Cart'

import './Content.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Content(props) {

    return (
        <div>
            <Routes>

                <Route exact path='/' element={<Landing />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:key' element={<Detailed />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/support' element={<Support />} />
                <Route path='*' element={<h1>404 - Not Found</h1>} />

            </Routes>
        </div>
    )
}