import { useEffect, useContext, useState } from 'react';

import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext';

import './Cart.css'

export default function Cart(props) {
    const { cartProducts, removeProductToCart, changeQuantityOfCartProduct, fetchCartProducts } = useContext(CartContext)
    const { user } = useContext(AuthContext);
    const [totalAmount, setTotalAmout] = useState(0)

    useEffect(() => {
        fetchCartProducts()
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (cartProducts?.length > 0) {
            const newTotal = []
            cartProducts?.forEach(item => {
                newTotal.push(item.price * item.quantity)
            });
            setTotalAmout(newTotal.reduce((prev, curr) => prev + curr))
        }
    }, [cartProducts])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h1>Cart</h1>
            <div className="cart-products-container">
                {
                    cartProducts?.map(product => {
                        return (
                            <div className="cart-product-container" key={product.id}>
                                <h3 className="cart-product-quantity cart-product-item">
                                    {product.quantity}x
                                </h3>
                                <h3 className="cart-product-title cart-product-item">
                                    {product.title}
                                </h3>
                                <h3 className='cart-product-price cart-product-item'>${product.price} per Item</h3>
                                <h3 className='cart-product-totalPrice cart-product-item'>Total Item Price = ${product.price * product.quantity}</h3>
                                <div className="cart-product-functions">
                                    <button
                                        className='cart-product-function'
                                        onClick={() => removeProductToCart(product)}
                                    >
                                        delete from cart
                                    </button>
                                    <button
                                        className='cart-product-function'
                                        onClick={() => changeQuantityOfCartProduct(product, 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className='cart-product-function'
                                        onClick={() => changeQuantityOfCartProduct(product, -1)}
                                    >
                                        -
                                    </button>
                                </div>

                            </div>
                        )
                    })

                }
            </div>

            {
                cartProducts?.length > 0 &&
                <div className="cart-summary-container">
                    <h2 className="cart-summary-title">Total</h2>
                    <h2 className="cart-summary-price">${totalAmount}</h2>
                </div>
            }


            {
                cartProducts?.length < 1 && <h2 className="nothing-in-cart"> No products yet in your cart </h2>
            }
        </div>
    )
}