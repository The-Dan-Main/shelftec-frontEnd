import './Products.css'

export default function Products(props) {

    return (
        <div className='products-container'>

            {props.isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

            {!props.isLoading && props?.products?.map(item => {
                return (
                    <div className='product-container' key={item.id}>
                        <h1 className='product-title'> {item.title} </h1>
                        <h3 className='product-category'>{item.category}</h3>
                        <p className='product-price' >${item.price}</p>
                        <img src={item.image} alt="" height="150px" className='product-image' />
                    </div>
                )
            })}
        </div>
    )
}