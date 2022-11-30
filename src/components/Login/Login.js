import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';

import './Login.css'

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [Message, setMessage] = useState("")

    const { setUser, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const BASE_URL = `https://shelf-tec-store.herokuapp.com`

    

    const loginCall = async () => {
        try {
            let response = await axios.post(`${BASE_URL}/auth/login`, {
                email: email,
                password: password
            })
            setLoggedIn(true)
            setUser(response.data.foundUser);
            Cookies.set("authToken", response.data.token);
            setMessage("Successfull Login!")
            setTimeout(() => {
                setAuth(true);
                navigate("/");
            }, 3000);

        } catch (error) {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                setMessage(error.response.data.message)
            }
        }
    }

    const handleLogInRequest = async (e) => {
        e.preventDefault();
        axios.get(`${BASE_URL}/users`)
            .then(async (res) => {
                if (!res.data.filter(e => e.email === email).length > 0) {
                    setMessage("user does not exists")
                }
                else {
                    loginCall()
                }
            })
    }

    const handleEnterOnInput = (key) => {
       if (key.code === "Enter")  handleLogInRequest(key)
    }

    return (
        <div className='login-container'>

            {
                !loggedIn &&
                <div className="login-wrapper">
                    <h1>Log-In</h1>

                    <label>
                        <h3 className="signIn-form-title">Email:</h3>
                        <input
                            required type="email"
                            className='signIn-form-input'
                            title="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            onKeyUp={(e)=> handleEnterOnInput(e)}
                        />
                    </label>
                    <label>
                        <h3 className="signIn-form-title">Password:</h3>
                        <input
                            required
                            type="password"
                            className='signIn-form-input'
                            title="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            onKeyUp={(e)=> handleEnterOnInput(e)}
                            />
                            <br />
                        <Link className="login-link" to="/forgottenPassword">
                            I forgot my password!
                        </Link>
                    </label>
                    <div className="signIn-form-btns">
                        <button onClick={(e) => handleLogInRequest(e)}>Log me In!</button>
                    </div>

                    <Link className="login-link" to="/sign-up">
                        Click here create an account!
                    </Link>


                </div>
            }
            {
                !loggedIn ?
                    <div className="error-wrapper">
                        <h1> {Message} </h1>
                    </div>
                    :
                    <div className="loggedIn-wrapper">
                        <h1> {Message} </h1>
                        <h2>Welcome Back!</h2>
                    </div>

            }

        </div>
    )
}