import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, signInWithGoogle } from './firebase';
import { useHistory } from 'react-router';

import { AuthContext } from './AuthProvider';
import './Login.css';

let Login = () =>{

    let value = useContext(AuthContext);
    let history = useHistory();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    return (
        <div>
        { (value) ? <Redirect to="/home" /> : "" }

            <div className="full-area">
                <div className="login-area">
                    <div className="login">
                        <h1 className="insta-heading">Instagram</h1>
                        <div className="login-input">
                            <div className="login-form">
                                <div className="in-login-form">
                                    <div className="input-one">
                                    <input
                                       placeholder="Phone number, username or email address"
                                       type="email"
                                       value={email}
                                       onChange={(e)=>{
                                            setEmail(e.currentTarget.value);
                                       }}
                                    />
                                        {/* <input placeholder="Phone number, username or email address" disabled/> */}
                                    </div>
                                    <div className="input-one">
                                        <input
                                          placeholder="Password"
                                          type="password"
                                          value={password}
                                          onChange={(e)=>{
                                            setPassword(e.currentTarget.value);
                                          }}
                                        />
                                        {/* <input placeholder="Password" disabled/> */}
                                    </div>
                                    <div className="input-one">
                                        {/* <button className="login-btn" disabled>Log In</button> */}
                                        <button
                                          className="login-btn"
                                           type="submit"
                                          onClick={(e)=>{
                                            e.preventDefault();
                                            auth.signInWithEmailAndPassword(email, password);
                                          }}
                                        >
                                        Log In
                                        </button>
                                    </div>
                                    <div className="kaju">
                                        <div className="kaju1"></div>
                                        <div className="kaju2">or</div>
                                        <div className="kaju3"></div>
                                    </div>
                                    <div className="sign-in-google">
                                        <span className="iconify" data-icon="flat-color-icons:google"></span>
                                        <button
                                          type="submit"
                                          className ="login-with-google"
                                          onClick={signInWithGoogle}
                                        >
                                            Log in with Google
                                        </button>
                                    </div>
                                </div>
                                <a href="/#" className="forgot-pass">Forgotten your password?</a>
                            </div>
                        </div>
                    </div>

                    <div className="signup">
                        <div className="in-signup">
                            <p className="no-account">
                                Don't have an account?
                                {/* <a href="/#">
                                    <span className="sign-up">
                                        Sign up
                                    </span>
                                </a> */}
                                <button
                                // type="submit"
                                className="sign-up"
                                onClick={(e)=>{
                                    //e.preventDefault();      //either use it or comment type="submit"
                                    history.push('./signup');
                                }}
                                >
                                Sign Up
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="get-app">
                        <p className="get-the-app-para">Get the app.</p>
                        <div className="get-app-icons">
                            <span className="iconify stores" data-icon="bx:bxl-apple"></span>
                            <span className="iconify stores" data-icon="logos:google-play-icon"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;