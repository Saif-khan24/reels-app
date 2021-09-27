import firebase from 'firebase/app';

import "firebase/firestore";

import "firebase/auth";

import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyBetazdz37b8YiPMTqEGo1Jz7cs9nvnecI",
  authDomain: "reels-b09f9.firebaseapp.com",
  projectId: "reels-b09f9",
  storageBucket: "reels-b09f9.appspot.com",
  messagingSenderId: "711514596663",
  appId: "1:711514596663:web:ff85038f37c08948b326b2"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();  //obj of fire-store
export const auth = firebase.auth();            //obj of auth
export const storage = firebase.storage();

let provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;