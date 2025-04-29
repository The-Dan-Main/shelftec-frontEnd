import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import './ChangePassword.css'

export default function ChangePassword(props) {
    const
        [oldPassword, setOldpassword] = useState(""),
        [password, setPassword] = useState(""),
        [passwordConfirmation, setPasswordConfirmation] = useState(""),
        [isEqual, setIsEqual] = useState(true),
        [passwordValidationLowerCase, setPasswordValidationLowerCase] = useState(false),
        [passwordValidationUpperCase, setPasswordValidationUpperCase] = useState(false),
        [passwordValidationNumber, setPasswordValidationNumber] = useState(false),
        [passwordValidationSpecialChar, setPasswordValidationSpecialChar] = useState(false),
        [passwordValidationLength, setPasswordValidationLength] = useState(false),
        [isLoggedIn, setIsLoggedIn] = useState(false),
        [error, setError] = useState(""),
        { user } = useContext(AuthContext),
        BASE_URL = process.env.REACT_APP_API_URL,
        navigate = useNavigate();

    const handleOldPasswordInput = (password) => {
        setError("")
        setOldpassword(password)
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
        validatePassword()
    }, [password])// eslint-disable-line react-hooks/exhaustive-deps

    const handleSignUpRequest = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/auth/resetPassword`, {
            firstName: user.first_name,
            email: user.email,
            password: oldPassword,
            newPassword: password
        }).then((res) => {
            console.log(res)
            setIsLoggedIn(true)
            setTimeout(() => {
                navigate("/user")
            }, 3000);
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }



    return (
        <div className='signUp-container passwordChange-container'>
            {
                !isLoggedIn ?
                    <div className="signUp-wrapper">
                        <div className="signUp-form-container">
                            <div className="signUp-form-element">
                                <h1 className='signUp-title'>Let's change your password</h1>
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Current Password:</h3>
                                <input required type="password" className='signUp-form-input' title="current Password" onChange={(e) => handleOldPasswordInput(e.target.value)} value={oldPassword} />
                                {
                                    error.length > 0 &&
                                    <p className='signUp-isNotEqual'> {error}</p>
                                }
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">New Password:</h3>
                                <input required type="password" className='signUp-form-input newPassword' title="password" onChange={(e) => handlePasswordInput(e.target.value)} value={password} />
                                {
                                    oldPassword === password && <p className='signUp-isNotEqual'>New password needs to different from current!</p>
                                }
                            </div>
                            <div className="signUp-form-element">
                                <h3 className="signUp-form-title">Confirm New Password:</h3>
                                <input required type="password" className={`signUp-form-input isEqual-${isEqual}`} title="password" onChange={(e) => handlePasswordConfirmationInput(e.target.value)} />
                                {
                                    !isEqual && <p className='signUp-isNotEqual'>Passwords do not match!</p>
                                }
                            </div>
                            <div className="signUp-form-submit signUp-form-element">
                                {
                                    (
                                        isEqual &&
                                        passwordValidationLowerCase &&
                                        passwordValidationUpperCase &&
                                        passwordValidationNumber &&
                                        passwordValidationSpecialChar &&
                                        passwordValidationLength
                                    ) &&
                                    <button className='signUp-form-submit-btn' onClick={(e) => handleSignUpRequest(e)}>Change Password!</button>
                                }
                                {
                                    (
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
                        </div>
                        <div className="passwordValidation-container">
                            <h3 className="passwordValidation-title">New Password Requirements</h3>
                            <h5 className="passwordValidation-desc">Your password must meet all of the following criteria:</h5>
                            <div className="validation-element-container">
                                {passwordValidationLowerCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationLowerCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one lower case letter</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationUpperCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationUpperCase &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one upper case letter</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationNumber &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationNumber &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one digit number (0-9)</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationSpecialChar &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationSpecialChar &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/red-cross-mark.png')} className="validation-element-confirmation" />
                                }
                                <p className="validation-element-title">at least one special character <br /> ( ! @ # $ % ^ & * . , _ - )</p>
                            </div>
                            <div className="validation-element-container">
                                {passwordValidationLength &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/green-check.png')} className="validation-element-confirmation" />
                                }
                                {!passwordValidationLength &&
                                    <img alt='indicator if the requirements are met' src={require('../../../img/red-cross-mark.png')} className="validation-element-confirmation" />
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
                        <h1> You have Successfully changed your Password! </h1>
                    </div>
            }
        </div>
    )
}