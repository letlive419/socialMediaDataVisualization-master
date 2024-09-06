import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import {auth, app} from "./firebaseconfig"
import { firestore } from "firebase-admin";


export default class FirebaseAuth  {
    constructor() {
       
        this.db = getFirestore(app)
        
    }

       

       async createUserWithTraditionalMethod(auth, email, password) {
       try {
        
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            console.log(`Successfully logged in as ${userCredential}`)
       }
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode = ${errorCode}, ErrorMessage: ${errorMessage}`)
        }
    }

       

        async addUserToFirestore(name, email) {
        try {
           
            await addDoc(collection(this.db, "users"), {
                name:name,
                uid:uuidv4(),
                email:email,

            });
            console.log("Success")

        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }




       
        
        
    }
    
   
