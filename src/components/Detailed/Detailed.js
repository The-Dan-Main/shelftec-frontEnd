import { useParams } from 'react-router-dom'
import './Detailed.css'

export default function Detailed(props) {

    const params = useParams()
    console.log("params:",params.key)
    return (
        <div>
            <h1>Detailed for Product-ID: <span>{params.key}</span></h1>
        </div>
    )
}