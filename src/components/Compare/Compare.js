import { useContext } from 'react'

import { CompareContext } from '../../contexts/CompareContext'

import './Compare.css'

export default function Compare(props) {
    const { compareProducts, removeProductToCompare } = useContext(CompareContext)

    const calculateStars = (rating) => {
        let newWidth = (40 /5) * rating
        return {
            width: `${newWidth}%`
        }
    }

    return (
        <div className='compare-wrapper'>
            <div className="compare-container">
                <div className="compare-sidebar-container">
                    
                </div>

                {compareProducts?.map((product) => {
                    return (
                        <div className="compare-product-container">
                            <button onClick={() => removeProductToCompare(product)} title="delete from compare" className='compare-product-delete' >X</button>
                            <h3 className="compare-product-title"> {product.title} </h3>
                            <p className="compare-product-price"> {product.price} $</p>
                            <p className="compare-product-category"> {product.category} </p>
                            <div className="product-rating-container ratings">
                                <div className="empty-stars"></div>
                                <div class="full-stars" style={calculateStars(product.rating)}></div>
                                <div className="product-rating-count"><p>{ product.rate_count > 0 && product.rate_count }</p></div>
                            </div>
                            <p className="compare-product-desc"> {product.description} </p>
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