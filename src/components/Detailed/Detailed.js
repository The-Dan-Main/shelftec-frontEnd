import { useParams } from 'react-router-dom'
import axios from "axios";
import './Detailed.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Detailed(props) {
    const [detailedProduct, setDetailedProduct] = useState({})

    const params = useParams()
    // console.log("params:", params.key)
    useEffect(() => {
        try {
            axios.get(`https://shelf-tec-store.herokuapp.com/products/${params.key}`)
                .then(response => {
                    setDetailedProduct(response.data[0])
                    console.log(/[.]/.test(detailedProduct.price) );
                    console.log(detailedProduct.price);
                })
        } catch (error) {
            console.log(error);
        }

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <h1>Detailed for Product-ID: <span>{params.key}</span></h1>
            {
                Object.keys(detailedProduct).length > 0 &&
                <section>
                    <div className="detailed-product-image-container">
                        <img src={detailedProduct.image} alt="product photo" />
                    </div>
                    <div className="detailed-product-info-container">
                        <h3 className="detailed-product-price"> {/[.]/.test(detailedProduct.price) ? `${detailedProduct.price}`: `${detailedProduct.price}.-`} </h3>
                        <h3 className="detailed-product-title"> {detailedProduct.title} </h3>
                    </div>
                </section>
            }
        </>
    )
}