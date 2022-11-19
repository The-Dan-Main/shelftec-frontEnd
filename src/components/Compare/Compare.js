import { useContext } from 'react'

import { CompareContext } from '../../contexts/CompareContext'

import './Compare.css'

export default function Compare(props) {
    const { compareProducts, removeProductToCompare } = useContext(CompareContext)


    return (
        <div className='compare-wrapper'>
            <h1>Compare</h1>
            <div className="compare-container">

                {compareProducts?.map((product) => {
                    return (
                        <div className="compare-product-container">
                            <h3 className="compare-product-title"> {product.title} </h3>
                            <p className="compare-product-desc"> {product.description} </p>
                            <p className="compare-product-price"> {product.price} $</p>
                            <button onClick={() => removeProductToCompare(product)} >Remove from compare!</button>
                        </div>
                    )
                })}

                {
                    compareProducts?.length < 1 && <h2 className="nothing-in-cart"> No products yet to compare </h2>
                }

            </div>
        </div>
    )
}