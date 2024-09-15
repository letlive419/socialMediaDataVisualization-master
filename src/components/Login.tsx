import { useState } from "react";
import Nav from "./Nav";
import {FirebaseAuth, auth} from "../firebase.js"



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();
        const firebase = new FirebaseAuth();
        const user = await firebase.signInUser(auth, email, password)
       


    }

    function showPassword () {
        var element =  document.getElementById("password") as HTMLInputElement;
        console.log(element.type)
        if (element.type === "password"){
            element.type = "text";
        }else {
            element.type = "password"
        }
    }

    return(
        
        <div>
            <Nav></Nav>
            Login
            
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="username" required onChange={(e) => setEmail(e.target.value)}/><br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
              <input type="checkbox" onClick={showPassword}/> Show Password <br/>
              <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default Login;