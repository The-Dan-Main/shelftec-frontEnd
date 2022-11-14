import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './SignUp.css'

export default function SignUp(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLarstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [isEqual, setIsEqual] = useState(true)

    const BASE_URL = `https://shelf-tec-store.herokuapp.com`
    const navigate = useNavigate();

    const handlePasswordInput = (newPassword) => {
        setPassword(newPassword)        
        if (newPassword === passwordConfirmation) {
            setIsEqual(true)
        } else {
            setIsEqual(false)
        }
    }

    const handlePasswordConfirmationInput = (newPasswordConfirmation) => {
        setPasswordConfirmation(newPasswordConfirmation)            
        if (password === newPasswordConfirmation) {
            setIsEqual(true)
        } else {
            setIsEqual(false)
        }
    }


    const handleSignUpRequest = (e) => {
        if (isEqual && firstName !== "" && lastName !== "" && email !== "" && password !== "") {
            e.preventDefault();
            setAlreadyExists(false)
            axios.get(`${BASE_URL}/users`)
                .then(res => {
                    console.log(res.data)
                    console.log(res.data.filter(e => e.email === email))
                    if (res.data.filter(e => e.email === email).length > 0) {
                        console.log("user does exists already")
                        setAlreadyExists(true)
                    }
                    else {
                        console.log("user does not exists already!")
                        axios.post(`${BASE_URL}/auth/signup`, {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: password
                        })
                            .then((res) => {
                                console.log(res)
                                navigate("/")
                            })
                            .catch((err) => console.log(err))

                    }
                })
        }
    }



    return (
        <div>
            <h1>Sign-In</h1>

            <label>
                <h3 className="signUp-form-title">First Name:</h3>
                <input required type="text" className='signUp-form-input' title="first_name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </label>
            <label>
                <h3 className="signUp-form-title">Last Name:</h3>
                <input required type="text" className='signUp-form-input' title="last_name" onChange={(e) => setLarstName(e.target.value)} value={lastName} />
            </label>
            <label>
                <h3 className="signUp-form-title">Email:</h3>
                <input required type="email" className='signUp-form-input' title="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
                <h3 className="signUp-form-title">Password:</h3>
                <input required type="password" className='signUp-form-input' title="password" onChange={(e) => handlePasswordInput(e.target.value)} value={password} />
            </label>
            <label>
                <h3 className="signUp-form-title">Confirm Password:</h3>
                {
                    !isEqual && <p className='signUp-isNotEqual'>Passwords do not match!</p>
                }
                <input required type="password" className={`signUp-form-input isEqual-${isEqual}`} title="password" onChange={(e) => handlePasswordConfirmationInput(e.target.value)} />
            </label>
            <div className="signUp-form-btns">
                <button onClick={(e) => handleSignUpRequest(e)}>Sign me Up!</button>
            </div>
            <Link className="login-link" to="/login">Click here to login</Link>
            {
                alreadyExists &&
                <div className="alreadyExists-container">
                    <p>User with email '{email}' already exists!</p>
                </div>
            }

        </div>
    )
}