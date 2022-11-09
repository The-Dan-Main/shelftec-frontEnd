import { useState, createContext } from "react";


export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartProducts, setCartProducts] = useState([])

    const addProductToCart = (productToAdd) => {
        if (!cartProducts.find(item => item.id === productToAdd.id)) {
            productToAdd.quantity = 1;
            setCartProducts([...cartProducts, productToAdd])
            // add DB modelling here to add product to cart in DB
        }
        else {
            // add DB modelling here to increase quantity in DB
            changeQuantityOfCartProduct(productToAdd, 1)
        }
    }

    const removeProductToCart = (productToRemove) => {
        setCartProducts(cartProducts.filter(item => item.id !== productToRemove.id))
        // add DB modelling here to delete product from cart in DB
    }

    const changeQuantityOfCartProduct = (productToChange, quantity) => {
        const newCartProducts = []
        cartProducts?.forEach(product => {
            if (product.id === productToChange.id) {
                if (product.quantity > 0 && quantity > 0) {
                    product.quantity += quantity
                    newCartProducts.push(product)
                    // add DB modelling here to increase quantity in DB
                } else if (product.quantity > 1 && quantity < 0) {
                    product.quantity += quantity
                    newCartProducts.push(product)
                    // add DB modelling here to decrease quantity in DB
                }
            } else {
                // means that this product is not the one, we want to change
                newCartProducts.push(product)
            }
        })

        setCartProducts(newCartProducts)
    }


    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addProductToCart,
            removeProductToCart,
            changeQuantityOfCartProduct
        }}>
            {props.children}
        </CartContext.Provider>
    )
}