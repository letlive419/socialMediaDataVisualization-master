import Nav from "../components/Nav"
import {Link} from "react-router-dom"



function Home () {

   
    return(
        <div>
            <Nav></Nav>
            <h1>Home</h1>
            <div>
            <Link to="/Login"><button>Login</button></Link>
            </div>
            <Link to="/Signup"> <button>Register</button></Link>
        </div>
    )
}

export default Home;

