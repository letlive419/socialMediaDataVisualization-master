import { useAppSelector, useAppDispatch } from "../app/hooks";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setStateFalse } from "../features/handleLogin/isLoggedIn";



function Nav() {
    const loggedIn = useAppSelector((state) => state.isLoggedIn.value);
    const dispatch = useAppDispatch()
   


    const navigate = useNavigate()
    function handleClick() {
        if (loggedIn) {
            localStorage.removeItem("email")
            navigate("/")
            dispatch(setStateFalse())
        }
        
    }
    return(
        <div className="border">
        <div className="navbar">
        
           
                <img src="https://static.vecteezy.com/system/resources/previews/006/627/369/original/cool-monkey-logo-design-illustrator-free-vector.jpg" alt="socialmediaassistant"/>
                <div className="dropdown">
                <button className="dropbtn"> Top Features </button>
                <div className="dropdown-content">
                    <button>Social Media Analytics</button>
                    <button>Publish and Schedule</button>
                    <button>Social Listening</button>
                    <button>AI Content Creater</button>
                    <button>Best Times to Post</button>
                </div>
                </div>
                <button>Integrations</button>
                <button>Industries</button>
                <button>Resources</button>
                <button>Pricing</button>
                <button>Enterprise</button>
                {(loggedIn) ? null :
    
                <Link to="/"><button className="spacer">Home</button></Link>
                
                }
                
                <Link to="/Dashboard"><button className="spacer">Dashboard</button></Link>
                
                {(loggedIn)? 
                
                    <button onClick={handleClick} id="signOut-button">SignOut</button>
                
                :null}
                <div className="spacer">
                <Link to="/Login"> <button className="loginbtn">Login</button></Link>

                <Link to= "/Signup"><button className="registerbtn">Register</button></Link>
                </div>

        </div>
        </div>
    )
}

export default Nav;