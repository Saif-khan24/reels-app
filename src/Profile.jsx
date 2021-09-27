import { useEffect, useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { firestore } from "./firebase";
import Navbar from './Navbar';

import './Profile.css'


let Profile = ()=>{
    let value = useContext(AuthContext);    //has uid, name, email, ... 
    let [totalPosts, setTotalPosts] = useState(0);

    // console.log(value);

    useEffect(()=>{

        let f = async()=>{
            let querySnapshot = await firestore
              .collection("posts")
              .where("username", "==", value.displayName)
              .get();

            // console.log("size", querySnapshot.size);
            setTotalPosts(querySnapshot.size);
        };

        if(value){
            f();
        }
    // });
    }, []);

    return (
        <>
            {
                (value) ? 
                <>
                <Navbar />
                <div className="total-area">
                    <img className="profile-img" src={value.photoURL} alt="Loading..." />
                    <p className="profile-username">{value.displayName}</p>
                    <p className="totalPosts">Posts: {totalPosts}</p>
                </div>
                </>   : (
                <Redirect to="/login" />
            )}
        </>
    )
}

export default Profile;