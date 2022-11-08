import { useState, createContext } from "react";


export const CompareContext = createContext();


export default function CompareContextProvider (props) {
    const [compareProducts, setCompareProducts] = useState([])

    const addProductToCompare = (productToAdd) => {
        !compareProducts.find(item => item.id === productToAdd.id) && setCompareProducts([...compareProducts, productToAdd])
    }

    const removeProductToCompare = (productToRemove) => {
        setCompareProducts(compareProducts.filter(item => item.id !== productToRemove.id))
    }

    return (

        <CompareContext.Provider value={{ compareProducts, addProductToCompare, removeProductToCompare }} >
            {props.children}
        </CompareContext.Provider>
    )
}