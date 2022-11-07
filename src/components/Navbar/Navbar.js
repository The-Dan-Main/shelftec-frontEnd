import * as React from "react";
import { Link, useNavigate } from 'react-router-dom'


import './Navbar.css'

export default function Navbar(props) {
    const [searchInput, setSearchInput] = React.useState("")
    const navigate = useNavigate();
    const handleInput = (searchInput) => {
        setSearchInput(searchInput)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('enter pressed', searchInput)
            props.searchForProducts(searchInput)
        }
    }

    // console.log(props.loggedInProfile)

    const SignInHandleClick = () => {
        navigate("/sign-In")
    }


    return (
        <div className="navbar-container">
            <div className="loadingBar"></div>
            <div className="navbar">
                <div className="navbar-logo-container">
                    <img src={require("../../img/logo.png")} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-search-container">
                    <input type="text" className="navbar-search-input" placeholder="search by name..." onKeyUp={(e) => handleEnter(e)} onChange={(e) => handleInput(e.target.value)} value={searchInput} />
                    <button className="navbar-search-imgContainer" onClick={() => props.searchForProducts(searchInput)} >
                        <img src={require("../../img/search.png")} alt="Search" className="navbar-search-img" />
                    </button>
                </div>
                <div className="navbar-menu-links">
                    {
                        props.loggedInProfile?.length <= 0 &&
                        <div className="signIn-Container" onClick={SignInHandleClick}>
                            <h1 className="Sign-In-title">Sign In</h1>
                        </div>

                    }
                    <Link to="/"><img src={require("../../img/home.png")} alt="Homepage" title="Homepage" className="navbar-links-cart" /></Link>
                    <Link to="/compare"><img src={require("../../img/compare.png")} alt="Compare" title="Compare" className="navbar-links-cart" /></Link>
                    <Link to="/cart"><img src={require("../../img/cart.png")} alt="Cart" title="Cart" className="navbar-links-cart" /></Link>
                    <Link to="/support"><img src={require("../../img/support.png")} alt="Support" title="Support" className="navbar-links-cart" /></Link>
                    <Link to="/user/"><img src={require("../../img/user.png")} alt="User" title="User" className="navbar-links-cart" /></Link>
                </div>
            </div>

        </div>
    )
}