import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";


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
            return true
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`ErrorCode = ${errorCode}, ErrorMessage: ${errorMessage}`);
            return false
            
        }
    }

    async addUserToFirestore(name, email,user_id) {
        // let uid = uuidv4();
        try {
            
            await setDoc(doc(this.db, "users", email), {
                name: name,
                user_id: user_id,
                
            })
            console.log(`finished updating fireStore with name: ${name}, and email: ${email}`)
           
            
        } catch (e) {
            
            console.error("Error adding document: ", e);
        }
       
        // return uid
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

    async updateUser(email, account_id) {
        const docRef = doc(this.db, "users", email)
        await updateDoc(docRef, {
            accountID: account_id,
            
            
        });
    }

    async getUser(email) {
        const docRef = doc(this.db, "users", email)
        const docSnap = await getDoc(docRef)
        return docSnap

    }
    
}
