import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './SignUp.css'
import { useEffect } from 'react';

export default function SignUp(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLarstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [isValidEmail, setisValidEmail] = useState(true)
    const [isEqual, setIsEqual] = useState(true)
    const [passwordValidationLowerCase, setPasswordValidationLowerCase] = useState(false)
    const [passwordValidationUpperCase, setPasswordValidationUpperCase] = useState(false)
    const [passwordValidationNumber, setPasswordValidationNumber] = useState(false)
    const [passwordValidationSpecialChar, setPasswordValidationSpecialChar] = useState(false)
    const [passwordValidationLength, setPasswordValidationLength] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const BASE_URL = `https://shelf-tec-store.herokuapp.com`
    const navigate = useNavigate();

    const handleEmailInput = (newEmail) => {
        setEmail(newEmail)
        if (newEmail === "") return setisValidEmail(true)
        //eslint-disable-next-line no-control-regex
        const emailReq = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (newEmail.match(emailReq)) {
            setisValidEmail(true)
        } else {
            setisValidEmail(false)
        }
    }

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

    const validatePassword = async () => {
        const lowerCaseCheck = /[a-z]/g
        const upperCaseCheck = /[A-Z]/g;
        const numberCheck = /[0-9]/g;
        const specialCharCheck = /[!@#$%^&*.,_-]/g;
        const lengthCheck = password.length > 7 && password.length < 21

        if (password.match(lowerCaseCheck)) {
            setPasswordValidationLowerCase(true)
        } else {
            setPasswordValidationLowerCase(false)
        }
        if (password.match(upperCaseCheck)) {
            setPasswordValidationUpperCase(true)
        } else {
            setPasswordValidationUpperCase(false)
        }
        if (password.match(numberCheck)) {
            setPasswordValidationNumber(true)
        } else {
            setPasswordValidationNumber(false)
        }
        if (password.match(specialCharCheck)) {
            setPasswordValidationSpecialChar(true)
        } else {
            setPasswordValidationSpecialChar(false)
        }
        if (lengthCheck) {
            setPasswordValidationLength(true)
        } else {
            setPasswordValidationLength(false)
        }
    }

    useEffect(() => {
        setAlreadyExists(false)
    }, [email])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        validatePassword()
    }, [password])// eslint-disable-line react-hooks/exhaustive-deps

    const handleSignUpRequest = (e) => {
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
                            setIsLoggedIn(true)
                            setTimeout(() => {
                                navigate("/user")
                            }, 2000);
                        })
                        .catch((err) => console.log(err))
                }
            })
    }



    return (
        <div className='signUp-container'>
            {
                !isLoggedIn ?
                    <div className="signUp-wrapper">
                        <div className="signUp-form-container">
                            <div className="signUp-form-element">
                                <h1 className='signUp-title'>Let's create your account</h1>
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">First Name:</h3>
                                <input required type="text" className='signUp-form-input' title="first_name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Last Name:</h3>
                                <input required type="text" className='signUp-form-input' title="last_name" onChange={(e) => setLarstName(e.target.value)} value={lastName} />

                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Email:</h3>
                                <input required type="email" className='signUp-form-input' title="email" onChange={(e) => handleEmailInput(e.target.value)} value={email} />
                                {
                                    alreadyExists &&
                                    <p className='alreadyExists-message'>User with this email already exists, please login!</p>
                                }
                                {
                                    !isValidEmail &&
                                    <p className='alreadyExists-message'>Please insert a valid email address!</p>
                                }
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Password:</h3>
                                <input required type="password" className='signUp-form-input' title="password" onChange={(e) => handlePasswordInput(e.target.value)} value={password} />
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Confirm Password:</h3>
                                <input required type="password" className={`signUp-form-input isEqual-${isEqual}`} title="password" onChange={(e) => handlePasswordConfirmationInput(e.target.value)} />
                                {
                                    !isEqual && <p className='signUp-isNotEqual'>Passwords do not match!</p>
                                }
                            </div>
                            <div className="signUp-form-submit signUp-form-element">
                                {
                                    (
                                        firstName !== "" &&
                                        lastName !== "" &&
                                        email !== "" &&
                                        !alreadyExists &&
                                        isEqual &&
                                        isValidEmail &&
                                        passwordValidationLowerCase &&
                                        passwordValidationUpperCase &&
                                        passwordValidationNumber &&
                                        passwordValidationSpecialChar &&
                                        passwordValidationLength
                                    ) &&
                                    <button className='signUp-form-submit-btn' onClick={(e) => handleSignUpRequest(e)}>Sign me Up!</button>
                                }
                                {
                                    (
                                        firstName === "" ||
                                        lastName === "" ||
                                        email === "" ||
                                        alreadyExists ||
                                        !isValidEmail ||
                                        !passwordValidationLowerCase ||
                                        !passwordValidationUpperCase ||
                                        !passwordValidationNumber ||
                                        !passwordValidationSpecialChar ||
                                        !passwordValidationLength ||
                                        !isEqual
                                    ) &&
                                    <p className='signUp-missingReq'>Looks like you did not finish everything yet!</p>
                                }
                            </div>
                            <div className="signUp-form-element">
                                <Link className="login-link" to="/login">You already have an account and want to login?</Link>
                            </div>
                        </div>
                        <div className="passwordValidation-container">
                            <h3 className="passwordValidation-title">Password Requirements</h3>
                            <h5 className="passwordValidation-desc">Your password must meet all of the following criteria:</h5>
                            <div className="validation-element-container">
                                {passwordValidationLowerCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationLowerCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one lower case letter</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationUpperCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationUpperCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one upper case letter</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationNumber &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationNumber &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one digit number (0-9)</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationSpecialChar &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationSpecialChar &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one special character <br /> ( ! @ # $ % ^ & * . , _ - )</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationLength &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationLength &&
                                    <img alt='indicator if the requirements are met' src={require('../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">between 8 and 20 characters <br /> Character-count: {password.length} </p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationLowerCase &&
                                    passwordValidationUpperCase &&
                                    passwordValidationNumber &&
                                    passwordValidationSpecialChar &&
                                    passwordValidationLength &&
                                    <h3 className="passwordIsValid">Well done, this password is Valid!</h3>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="loggedIn-wrapper">
                        <h1> You have Successfully created your Account! </h1>
                    </div>
            }
        </div>
    )
}