import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ForgotPassword.css'

export default function ForgotPassword(props) {
    const [email, setEmail] = useState("")
    const [Message, setMessage] = useState("")
    const [isSubmitted, setSubmitted] = useState(false)
    const navigate = useNavigate();
    const BASE_URL = `https://shelf-tec-store.herokuapp.com`


    const loginCall = async () => {
        try {
            await axios.post(`${BASE_URL}/email/forgotPassword`, {
                email: email
            })
            setMessage("Email with temporary password is sent to this email address!")
            setTimeout(() => {
                setSubmitted(true)
                navigate("/login");
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
                    setMessage("There is no account with this email address!")
                }
                else {
                    loginCall()
                }
            })
    }
    return (
        <div className='login-container'>

            {
                !isSubmitted &&
                <div className="login-wrapper">
                    <h1>Forgot Password</h1>
                    <p>After submitting your email, you will receive a temporary password, with which you can Login and change to your desired new password.</p>
                    <label>
                        <h3 className="signIn-form-title">Email:</h3>
                        <input
                            required type="email"
                            className='signIn-form-input'
                            title="email"
                            onChange={(e) => {
                                setSubmitted(false)
                                setEmail(e.target.value)
                            }
                            }
                            value={email}
                        />
                    </label>
                    <div className="signIn-form-btns">
                        <button onClick={(e) => handleLogInRequest(e)}>Reset my password!</button>
                    </div>
                    <Link className="login-link" to="/sign-up">
                        Back to Login
                    </Link>
                    <br />
                    <p><strong>or</strong></p>
                    <Link className="login-link" to="/sign-up">
                        Click here create an account!
                    </Link>


                </div>
            }
            {
                !isSubmitted ?
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