import { useEffect } from 'react'
import './User.css'

export default function User(props) {

    useEffect(() => {
        props.setSidebar(false)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h1>User</h1>
        </div>
    )
}