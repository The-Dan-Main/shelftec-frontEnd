import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { CompareContext } from "../../contexts/CompareContext";

import './Navbar.css'

export default function Navbar(props) {
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate();
    const handleInput = (searchInput) => {
        setSearchInput(searchInput)
    }
    let { auth } = useContext(AuthContext)
    const { cartProducts } = useContext(CartContext)
    const { compareProducts } = useContext(CompareContext)

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            props.filterProductsByKeyword(searchInput)
            navigate("/")
        }
    }
    const handleSignInClick = () => {
        navigate("/login")
    }

    const handleLogoClick = () => {
        navigate("/")
    }


    return (
        <div className="navbar-container">
            <div className="loadingBar"></div>
            <div className="navbar">
                <div className="navbar-logo-container">
                    <img
                        src={require("../../img/logo.png")}
                        alt="Logo"
                        className="navbar-logo"
                        onClick={handleLogoClick}
                    />
                </div>
                <div className="navbar-search-container">
                    <input
                        type="text"
                        className="navbar-search-input"
                        placeholder="Search for products, categories, brands and more"
                        value={searchInput}
                        onKeyUp={(e) => handleEnter(e)}
                        onChange={(e) => handleInput(e.target.value)}
                    />
                    <button
                        className="navbar-search-imgContainer"
                        onClick={() => {
                            navigate("/")
                            props.filterProductsByKeyword(searchInput)
                        }}
                    >
                        <img src={require("../../img/search.png")} alt="Search" className="navbar-search-img" />
                    </button>
                </div>
                <div className="navbar-menu-links">
                    {
                        !auth &&
                        <div className="signIn-Container" onClick={handleSignInClick}>
                            <h1 className="Sign-In-title">Sign In</h1>
                        </div>

                    }
                    <Link to="/">
                        <img
                            src={require("../../img/home.png")}
                            alt="Homepage"
                            title="Homepage"
                            className="navbar-links-cart"
                        />
                    </Link>
                    <div className="navbar-links-link">
                        <Link to="/compare">
                            <img
                                src={require("../../img/compare.png")}
                                alt="Compare"
                                title="Compare"
                                className="navbar-links-cart"
                            />
                            {
                                compareProducts?.length > 0 &&
                                <p className="navbar-links-compare-count"> {compareProducts.length} </p>
                            }
                        </Link>
                    </div>
                    <div className="navbar-links-link">
                        <Link to="/cart">
                            <img
                                src={require("../../img/cart.png")}
                                alt="Cart"
                                title="Cart"
                                className="navbar-links-cart"
                            />
                            {
                                cartProducts?.length > 0 &&
                                <p className="navbar-links-cart-count"> {cartProducts.length} </p>
                            }
                        </Link>
                    </div>
                    <Link to="/support">
                        <img
                            src={require("../../img/support.png")}
                            alt="Support"
                            title="Support"
                            className="navbar-links-cart"
                        />
                    </Link>
                    <Link to="/user/">
                        <img
                            src={require("../../img/user.png")}
                            alt="User"
                            title="User"
                            className="navbar-links-cart"
                        />
                    </Link>
                </div>
            </div>

        </div >
    )
}