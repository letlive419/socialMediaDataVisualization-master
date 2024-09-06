import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "socialmediadatavisualizer.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "socialmediadatavisualizer.appspot.com",
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-Q09VEC0PX1" 
}


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)