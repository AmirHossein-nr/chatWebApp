import firebase from "firebase/app";
import "firebase/auth";


export const authentication = firebase.initializeApp({
    apiKey: "AIzaSyDEp4owuOaWFXbQSClhCukEV7OtopZFONg",
    authDomain: "yumgram-b71ed.firebaseapp.com",
    projectId: "yumgram-b71ed",
    storageBucket: "yumgram-b71ed.appspot.com",
    messagingSenderId: "949769257528",
    appId: "1:949769257528:web:61870ad39c5b36a4c25ccd"
}).auth();