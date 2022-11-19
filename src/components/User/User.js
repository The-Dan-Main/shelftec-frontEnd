import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'
import './User.css'

export default function User(props) {
    const { logout } = useContext(AuthContext)
    const { setCartProducts } = useContext(CartContext)

    const handleLogOut = () => {
        setCartProducts([])
        setTimeout(() => {
            logout()
        }, 1000);

    }

    return (
        <div>
            <h1>User</h1>
            <button onClick={() => handleLogOut()}>log me out!</button>
        </div>
    )
}