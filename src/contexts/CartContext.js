import axios from "axios";
import { useContext } from "react";
import { useState, createContext } from "react";
import { AuthContext } from "./AuthContext";


export const CartContext = createContext();


export default function CartContextProvider(props) {
    const { user } = useContext(AuthContext)
    const [cartProducts, setCartProducts] = useState([])
    const BASE_URL = `${process.env.REACT_APP_API_URL}/cart`

    const fetchCartProducts = () => {
        axios.get(`${BASE_URL}/${user.Cart_id}/products`)
            .then(response => setCartProducts(response.data))
    }
    

    const addProductToCart = (productToAdd) => {
        if (!cartProducts.find(item => item.id === productToAdd.id)) {
            //if product does not exist already in the cart, add it to DB
            axios.post(`${BASE_URL}/${user.id}/products/${productToAdd.id}`)
                .then(response => {
                    setCartProducts(response.data)
                })
        }
        else {
            //if product already exists, increase the quantity of that product // to get the correct quantity, find the matching cart_product and then increase the quantity
            const increasedQuantityProduct = cartProducts.filter((item)=> item.id === productToAdd.id )[0]
            changeQuantityOfCartProduct(increasedQuantityProduct, 1)
        }
    }

    const removeProductToCart = (productToRemove) => {
        axios.delete(`${BASE_URL}/${user.id}/products/${productToRemove.product_id}`)
        .then(response => {
            setCartProducts(response.data)
        })
    }

    const changeQuantityOfCartProduct = (productToChange, quantity) => {
        const newQuantity = productToChange.quantity += quantity
        if (newQuantity <= 0) {removeProductToCart(productToChange)} 
        else {
            axios.put(`${BASE_URL}/${user.id}/products/${productToChange.product_id}/${newQuantity}`)
            .then(response => {
                setCartProducts(response.data)
            })
        }
    }


    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addProductToCart,
            removeProductToCart,
            fetchCartProducts,
            changeQuantityOfCartProduct
        }}>
            {props.children}
        </CartContext.Provider>
    )
}