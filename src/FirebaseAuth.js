import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";


export default class FirebaseAuth  {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: "socialmediadatavisualizer.firebaseapp.com",
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: "socialmediadatavisualizer.appspot.com",
            messagingSenderId: process.env.REACT_APP_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID,
            measurementId: "G-Q09VEC0PX1" 
        }

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`Successfully logged in as ${user}`)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode = ${errorCode}, ErrorMessage: ${errorMessage}`)
        })
        
    }
    
   
}