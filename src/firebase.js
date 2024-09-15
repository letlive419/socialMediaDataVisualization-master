import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


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
export const auth = getAuth(app)

export class FirebaseAuth {
    constructor() {
        this.db = getFirestore(app);
    }

    async createUserWithTraditionalMethod(auth, email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(`Successfully logged in as ${userCredential.user.email}`);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode = ${errorCode}, ErrorMessage: ${errorMessage}`);
        }
    }

    async addUserToFirestore(name, email) {
        let uid = uuidv4();
        try {
            
            await addDoc(collection(this.db, "users"), {
                name: name,
                uid: uid,
                email: email,
            })
           
            
        } catch (e) {
            uid = null
            console.error("Error adding document: ", e);
        }
       
        return uid
    }


    async signInUser(auth, email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            return userCredential.user
        }
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`There seems to be an issue Code: ${errorCode}, Message: ${errorMessage}`)
        }
        
    }
    
}
