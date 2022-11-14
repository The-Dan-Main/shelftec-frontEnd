import { useContext, useEffect } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'
import { CompareContext } from '../../contexts/CompareContext'

import Sidebar from '../Sidebar/Sidebar'

import './Landing.css'

export default function Landing(props) {
    const { addProductToCompare } = useContext(CompareContext)
    const { addProductToCart, fetchCartProducts } = useContext(CartContext)
    const { user } = useContext(AuthContext);

    //   Fetch all CartProducts, whenever the user logs in or out
    useEffect(() => {
        fetchCartProducts()
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='products-container'>
            <Sidebar filterProductsByCategory={props.filterProductsByCategory} />
            <div className="products-container-wrapper">

                {!props.isLoading && props?.products?.map(item => {
                    return (
                        <div className='product-container' key={item.id}>
                            <h3 className='product-category'>{item.category}</h3>
                            <div className="product-image-container">
                                <img src={item.image} alt="" className='product-image' />
                            </div>
                            <p className='product-price' >${item.price}</p>
                            <h1 className='product-title'> {item.title} </h1>
                            <div className="product-rating-container">
                                <p className="product-rating-text">{item.rating}/5 Stars</p>
                            </div>
                            <div className="product-functions-container">
                                <p className="product-functions-items" onClick={() => addProductToCompare(item)}>Compare</p>
                                <p className="product-functions-items" onClick={() => addProductToCart(item)}>Add to Cart</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}