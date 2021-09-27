import { createContext, useState, useEffect } from "react";
import { auth, firestore } from './firebase';

export const AuthContext = createContext();

let AuthProvider = ({children})=>{
    let [currentUser, setCurrentUser] = useState(null);
    let [loading, setLoading] = useState(true);

    // let {children} = props;    //in its place write the destructure at the top

    useEffect(()=>{
        let unsub = auth.onAuthStateChanged(async (user)=>{     //runs when a user either sign-in or sign-out ( that is why after sign-out agar fir '/home' pe jane ka try kro to it redirects on login)
            if(user){
                let {displayName, email, uid, photoURL} = user;
                // console.log(user); //contains all the info of the user, uid(unique id of each user)
                let docRef = firestore.collection("users").doc(uid);        

                let document = await docRef.get();
                if(!document.exists){
                    //if user not exist in firebase, set it in database
                    docRef.set({
                        displayName,
                        email,
                        photoURL,
                    });
                    console.log(displayName, email, photoURL);
                }

                setCurrentUser({displayName, email, uid, photoURL});
            }else{
                // console.log(user);
                setCurrentUser(user);
            }

            setLoading(false);
        });

        return ()=>{
            unsub();
        }
    }, []);


    //when user will login or logout completely then loading will become false ( by default it is true)
    return(
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;