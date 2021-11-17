import React, { useRef } from 'react';
import './Register.css';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match");
        }else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            }
            try{
                const res = await axios.post("/auth/register", user);
                history.push("/login");
            }catch(error){
                console.log(error);
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">timeless</h3>
                    <span className="loginDesc">
                        Connect with the colorful minds around you on timeless.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                        <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6" />
                        <input placeholder="Re type Password" required ref={passwordAgain} className="loginInput" type="password" minLength="6" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login" className="loginRegisterButtonLink">
                        <button className="loginRegisterButton">Log into your account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
