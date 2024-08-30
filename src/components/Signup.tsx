import { useState } from "react";
import bcrypt from "bcrypt";
import FirebaseAuth from "../FirebaseAuth";


function Signup() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [passwordToVerify, setPasswordToVerify] = useState("")
const [submitValid, setSubmitValid] = useState(false)
    const firebase = new FirebaseAuth()

    console.log(firebase)

    function handleSubmit(event) {
        event.preventDefault()
        
        if (submitValid) {
            const firebase = new FirebaseAuth(email, password);
        }
        
    }

    function handleMatching() {
        
        if (password !== passwordToVerify){
             alert("passwords must match");
             setSubmitValid(false)
            } else {
                setSubmitValid(!submitValid)
            }

    }
    return(
        <div>
            <h1> Register </h1>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="name">Enter your name</label>
              <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={(e) => setPasswordToVerify(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
              <label htmlFor="password">Confirm Password</label>
              <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onBlur={handleMatching} required/>
              {!submitValid ? <button type="submit"disabled>Submit</button> : <button type="submit">Submit</button>}
            </form>


        </div>
    )
}

export default Signup