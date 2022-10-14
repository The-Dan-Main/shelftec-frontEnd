import * as React from "react";
import { Link } from 'react-router-dom'


import './Navbar.css'

export default function Navbar(props) {


    return (
        <div className="navbar-container">
            <div className="loadingBar"></div>
            <div className="navbar">
                <div className="navbar-logo-container">
                    <img src={require("../../img/logo.png")} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-search-container">
                    <input type="text" className="navbar-search-input" />
                    <button className="navbar-search-imgContainer">
                        <img src={require("../../img/search.png")} alt="Search" className="navbar-search-img" />
                    </button>
                </div>

                <div className="navbar-menu-links">
                    <Link to="/"><img src={require("../../img/home.png")} alt="Homepage" className="navbar-links-cart" /></Link>
                    <Link to="/cart"><img src={require("../../img/cart.png")} alt="Cart" className="navbar-links-cart" /></Link>
                    <Link to="/compare"><img src={require("../../img/compare.png")} alt="Compare" className="navbar-links-cart" /></Link>
                    <Link to="/support"><img src={require("../../img/support.png")} alt="Support" className="navbar-links-cart" /></Link>

                </div>
            </div>

        </div>
    )
}