import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'
import './User.css'

export default function User(props) {
    const { logout, user } = useContext(AuthContext)
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
            <h3 className="user-name"> Welcome back, {user.first_name}! </h3>
            <p>here are your key facts:</p>
            <p>First name: <span>{user.first_name}</span> </p>
            <p>Last name: <span>{user.last_name}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
            <p>Account ID: <span>{user.id}</span> </p>

            <Link to={"/user/orders"} >all Orders</Link>
            <br />
            <button>
                <Link to={"/user/resetPassword"} >click to change password</Link>
            </button>
            <button onClick={() => handleLogOut()}>log me out!</button>
        </div>
    )
}