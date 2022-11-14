import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';

import './Login.css'

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setUser, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const BASE_URL = `https://shelf-tec-store.herokuapp.com`

    const handleLogInRequest = (e) => {
        e.preventDefault();
        axios.get(`${BASE_URL}/users`)
            .then(res => {
                // console.log(res.data)
                // console.log(res.data.filter(e => e.email === email))
                if (!res.data.filter(e => e.email === email).length > 0) {
                    console.log("user does not exists")
                }
                else {
                    console.log("user does exists!")

                    axios.post(`${BASE_URL}/auth/login`, {
                        email: email,
                        password: password
                    }).then((response) => {
                        setUser(response.data.foundUser);
                        setAuth(true);
                        console.log(response)
                        Cookies.set("authToken", response.data.token);
                        navigate("/");
                      });

                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div>   
            <h1>Log-In</h1>

            <label>
                <h3 className="signIn-form-title">Email:</h3>
                <input required type="email" className='signIn-form-input' title="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
                <h3 className="signIn-form-title">Password:</h3>
                <input required type="password" className='signIn-form-input' title="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
            <div className="signIn-form-btns">
                <button onClick={(e) => handleLogInRequest(e)}>Log me In!</button>
            </div>

            <Link className="login-link" to="/sign-in">Click here create an account!</Link>

        </div>
    )
}