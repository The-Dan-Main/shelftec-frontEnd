import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import './Cart.css'

export default function Cart(props) {
const { cartProducts, removeProductToCart, changeQuantityOfCartProduct } = useContext(CartContext)

    return (
        <div>
            <h1>Cart</h1>
            {
                cartProducts?.map(product => {
                    return (
                        <div className="cart-product-container" key={product.id}>
                            <h3 className="cart-product-title">
                                {product.quantity}x
                            </h3>
                            <h3 className="cart-product-title">
                                {product.title}
                            </h3>
                            <button onClick={() => removeProductToCart(product)} >delete from cart</button>
                            <button onClick={() => changeQuantityOfCartProduct(product, 1)} >+</button>
                            <button onClick={() => changeQuantityOfCartProduct(product, -1)} >-</button>

                        </div>
                    )
                })

            }
            {
                cartProducts?.length < 1 && <h2 className="nothing-in-cart"> No products yet in your cart </h2>
            }
        </div>
    )
}