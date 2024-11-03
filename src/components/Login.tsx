import { useState } from "react";
import Nav from "./Nav";
import {FirebaseAuth, auth} from "../firebase.js"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setStateTrue } from "../features/handleLogin/isLoggedIn";



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const loggedIn = useAppSelector((state) => state.isLoggedIn.value);
    const dispatch = useAppDispatch()

    const handleSubmit = async(event) => {
        event.preventDefault();
        const firebase = new FirebaseAuth();
        const user = await firebase.signInUser(auth, email, password)
        
        
        if (user) {
            //do something
            localStorage.setItem("email", user.email)
            dispatch(setStateTrue())
            navigate("/Dashboard", {state: user.email})
        }
        
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
            
            <div className="signup-flex">
                <div className="signup-left">
                    <img className="logo-image" src="https://static.vecteezy.com/system/resources/previews/006/627/369/original/cool-monkey-logo-design-illustrator-free-vector.jpg"></img>
                    <img className="created-image" src="images/1.png"></img>
                </div>
            <div className="register">
            <h1 className="register-title">Login</h1>
            <div className="form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="username" required onChange={(e) => setEmail(e.target.value)}/><br/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
              
              <button type="submit" className="submit-button">Submit</button>
            </form>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login;