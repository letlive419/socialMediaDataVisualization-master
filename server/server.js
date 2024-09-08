const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();


const expressApp = express();

expressApp.use(cors());

const firebaseConfig = {
    apiKey: process.env.APP_API_KEY,
    authDomain: "socialmediadatavisualizer.firebaseapp.com",
    projectId: process.env.APP_PROJECT_ID,
    storageBucket: "socialmediadatavisualizer.appspot.com",
    messagingSenderId: process.env.APP_SENDER_ID,
    appId: process.env.APP_APP_ID,
    measurementId: "G-Q09VEC0PX1" 
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

class FirebaseAuth {
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
        try {
            await addDoc(collection(this.db, "users"), {
                name: name,
                uid: uuidv4(),
                email: email,
            });
            console.log("Success");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

module.exports = FirebaseAuth;

expressApp.get("/", (req, res) => {
    res.send("Hello from our server!");
});

expressApp.listen(8080, () => {
    console.log("server listening on port 8080");
});
