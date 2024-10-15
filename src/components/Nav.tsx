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
        <>
        <nav>
            <ul>
                <li>
                <Link to="/"><button>Home</button></Link>
                </li>
                <li>
                <Link to="/Dashboard"><button>Dashboard</button></Link>
                </li>
                {(loggedIn)? 
                <li>
                    <button onClick={handleClick} id="signOut-button">SignOut</button>
                </li>
                :null}

            </ul>
        </nav>
        </>
    )
}

export default Nav;