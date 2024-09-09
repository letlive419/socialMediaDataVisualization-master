import { useState } from "react";
import {FirebaseAuth} from "../firebase";
import {auth} from "../firebase"



function Signup() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [passwordToVerify, setPasswordToVerify] = useState("")

   

    function handleSubmit(event) {
        event.preventDefault()

        if (password !== passwordToVerify){
            alert("passwords must match");
            return
           } else {
            console.log("Success")
            const fireAuth = new FirebaseAuth();
            fireAuth.createUserWithTraditionalMethod(auth, email, password);
            fireAuth.addUserToFirestore(name, email)
            
            
           }    
    }



    const showPassword = () => {
        var element =  document.getElementById("password") as HTMLInputElement;
        console.log(element.type)
        if (element.type === "password"){
            element.type = "text";
        }else {
            element.type = "password"
        }
    }
    const showConfirmPassword = () => {
        var element =  document.getElementById("confirmPassword") as HTMLInputElement;
        console.log(element.type)
        if (element.type === "password"){
            element.type = "text";
        }else {
            element.type = "password"
        }
    }
    return(
        <div>
            <h1> Register </h1>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="name">Enter your name </label>
              <input type="text" name="name" onChange={(e) => setName(e.target.value)} required/>
              <br/>

              <label htmlFor="email">Email </label>
              <input type="email"  name="email" onChange={(e) => setEmail(e.target.value)} required />
              <br/>

              <label htmlFor="password">Password </label>
              <input type="password" id="password" name="password" onChange={(e) => setPasswordToVerify(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
              <input type="checkbox" onClick={showPassword}/> Show Password
              <br/>

              <label htmlFor="confirmPassword">Confirm Password </label>
              <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  required/>
              <input type="checkbox" onClick={showConfirmPassword}/> Show Password
              <br/>

              <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>


        </div>
    )
}

export default Signup