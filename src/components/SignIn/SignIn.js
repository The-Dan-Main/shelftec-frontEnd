import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import './SignIn.css'

export default function SignIn(props) {
    const [fistName, setFirstName] = useState("")
    const [lastName, setLarstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alreadyExists, setAlreadyExists] = useState(false)

    useEffect(() => {

        props.setSidebar(false)

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const handleSignUpRequest = (e) => {
        e.preventDefault();
        setAlreadyExists(false)
        axios.get('https://shelf-tec-store.herokuapp.com/users')
            .then(res => {
                console.log(res.data)
                console.log(res.data.filter(e => e.email === email))
                if (res.data.filter(e => e.email === email).length > 0) {
                    console.log("user does exists already")
                    setAlreadyExists(true)
                }
                else {
                    console.log("user does not exists already!")
                    axios.post("https://shelf-tec-store.herokuapp.com/users/", {
                        first_name: fistName,
                        last_name: lastName,
                        email: email,
                        password: password
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .cath((err) => console.log(err))

                }
            })
    }
    return (
        <div>

            <label>
                <h3 className="signIn-form-title">First Name:</h3>
                <input required type="text" className='signIn-form-input' title="first_name" onChange={(e) => setFirstName(e.target.value)} value={fistName} />
            </label>
            <label>
                <h3 className="signIn-form-title">Last Name:</h3>
                <input required type="text" className='signIn-form-input' title="last_name" onChange={(e) => setLarstName(e.target.value)} value={lastName} />
            </label>
            <label>
                <h3 className="signIn-form-title">Email:</h3>
                <input required type="email" className='signIn-form-input' title="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
                <h3 className="signIn-form-title">Password:</h3>
                <input required type="password" className='signIn-form-input' title="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
            <div className="signIn-form-btns">
                <button onClick={(e) => handleSignUpRequest(e)}>Sign me Up!</button>
            </div>
            {
                alreadyExists &&
                <div className="alreadyExists container">
                    <p>User with email '{email}' already exists!</p>
                </div>
            }

        </div>
    )
}