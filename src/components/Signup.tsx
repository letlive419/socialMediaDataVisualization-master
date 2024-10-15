import { useEffect, useState } from "react";
import {FirebaseAuth} from "../firebase";
import {auth} from "../firebase"
import {PhylloSDK} from "../phyllosdk";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setStateTrue } from "../features/handleLogin/isLoggedIn";





function Signup() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [passwordToVerify, setPasswordToVerify] = useState("")
const navigate = useNavigate()
const dispatch = useAppDispatch()



    async function handleSubmit(event) {
        event.preventDefault()

        if (password !== passwordToVerify){
            alert("passwords must match");
            return
           } else {
            console.log("Success")
           }
            const fireAuth = new FirebaseAuth();
            const phylloSDK = new PhylloSDK();

            // phylloSDK.clearAccounts()


            if (await fireAuth.createUserWithTraditionalMethod(auth, email, password)) {
                const user_id = await phylloSDK.createUser(name);
                const user_token = await phylloSDK.createToken(user_id)
                await fireAuth.addUserToFirestore(name, email, user_id)
                await phylloSDK.syncAccount(name, user_id, user_token)
                localStorage.setItem("email", email)
                dispatch(setStateTrue())
                navigate("/Dashboard", {state: email})
                
            }

          let account_id = null;

           phylloSDK.account_id.addEventListener("start", (event:CustomEvent) => {
              account_id = event.detail;
              fireAuth.updateUser(email, account_id)
           })

 
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
            <Nav/>
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