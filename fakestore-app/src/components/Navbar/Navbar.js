import * as React from "react";
import { Link, NavLink, Router } from 'react-router-dom'


import './Navbar.css'

export default function Navbar(props) {


    return (
        <div>

            <Link to="/">Home</Link>
            <br/>
            <Link to="/products">Product</Link>
            <br/>
            <Link to="/cart">Cart</Link>
            <br/>
            <Link to="/support">Support</Link>

        </div>
    )
}