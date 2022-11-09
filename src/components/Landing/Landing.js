import { useContext } from 'react'
import { useEffect } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { CompareContext } from '../../contexts/CompareContext'
import './Landing.css'
export default function Landing(props) {
const { addProductToCompare } = useContext( CompareContext )
const { addProductToCart } = useContext( CartContext )
    
    useEffect(()=>{
        props.setSidebar(true)
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='products-container'>

            {props.isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

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
                            <p className="product-functions-items" onClick={()=> addProductToCompare(item)}>Compare</p>
                            <p className="product-functions-items" onClick={()=> addProductToCart(item)}>Add to Cart</p>
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}