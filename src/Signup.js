import { useState } from "react";
import { Redirect } from "react-router";
import { auth } from "./firebase";
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

let Signup = ()=>{
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let value = useContext(AuthContext);

    return ( 
        <>
        {value ? <Redirect to='/' /> : ""}
        <div className="row">
            <div className="col-4">


            <form className="m-4">
                <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.currentTarget.value);
                    }}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    />
                </div>
            
                <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.currentTarget.value);
                    }}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    />
                </div>

                <div className="mb-3">
                <label for="exampleInputPassword2" className="form-label">
                    Confirm Password
                </label>
                <input
                    value={confirmPassword}
                    onChange={(e)=>{
                        setConfirmPassword(e.currentTarget.value);
                    }}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword2"
                    />
                </div>
                <button
                onClick={(e)=>{
                    e.preventDefault();         //type submit h to reload hone ki koshish krega to us behaviour ko rokne ke liye or comment the type=submit
                    if(password == confirmPassword && password != "" && email != ""){
                        auth.createUserWithEmailAndPassword(email, password);
                    }
                    else{
                        alert("Please check password entered");
                    }
                }}
                type="submit"
                className="btn btn-primary"
                >
                Sign Up!
                </button>
            </form>
            </div>
        </div>
        
    </>
    )
}

export default Signup;