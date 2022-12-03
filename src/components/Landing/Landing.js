import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'
import { CompareContext } from '../../contexts/CompareContext'

import Sidebar from '../Sidebar/Sidebar'

import './Landing.css'

export default function Landing(props) {
    const { addProductToCompare } = useContext(CompareContext)
    const { addProductToCart, fetchCartProducts } = useContext(CartContext)
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    //   Fetch all CartProducts, whenever the user logs in or out
    useEffect(() => {
        fetchCartProducts()
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    const calculateStars = (rating) => {
        let newWidth = (40 /5) * rating
        return {
            width: `${newWidth}%`
        }
    }

    const handleProductClick = (e, id) => { 
        console.log(e.target)
        navigate(`/products/${id}`)
     }

    return (
        <div className='products-container'>
            <Sidebar filterProductsByCategory={props.filterProductsByCategory} />
            <div className="products-container-wrapper">

                {!props.isLoading && props?.products?.map(item => {
                    return (
                        <div
                            className='product-container'
                            key={item.id}
                            onClick={(e)=>handleProductClick(e, item.id)}
                        >
                            <div className="product-image-container">
                                <img src={item.image} alt="" className='product-image' />
                            </div>
                            <h3 className='product-category'>{item.category}</h3>
                            <p className='product-price' >{ /[.]/.test(item.price) ? `${item.price}`: `${item.price}.-`}</p>
                            <h1 className='product-title'> {item.title} </h1>
                            <div className="product-rating-container ratings">
                                <div className="empty-stars"></div>
                                <div className="full-stars" style={calculateStars(item.rating)}></div>
                                <div className="product-rating-count"><p>{ item.rate_count > 0 && item.rate_count }</p></div>
                            </div>
                            <div className="product-functions-container">
                                <img
                                    src={require("../../img/compare.png")}
                                    alt="Compare"
                                    title="Compare"
                                    className="product-functions-items"
                                    onClick={() => addProductToCompare(item)}
                                />
                                <img
                                    src={require("../../img/cart.png")}
                                    alt="Cart"
                                    title="Cart"
                                    className="product-functions-items"
                                    onClick={() => addProductToCart(item)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}