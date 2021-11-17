import React,{useContext, useRef} from 'react';
import './Login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const submitHandler = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value, password:password.current.value}, dispatch)
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">timeless</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on safebook.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={submitHandler}>
                        <input placeholder="email" type="email" className="loginInput" ref={email} required/>
                        <input placeholder="password" type="password" className="loginInput" minLength="4" ref={password} required/>
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" size="25px" /> : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/" className="loginRegisterButtonLink">
                        <button className="loginRegisterButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" size="25px" /> : "Create a New Account"}
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
