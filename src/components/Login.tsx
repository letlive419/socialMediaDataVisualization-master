import Nav from "./Nav";



function Login() {
    return(
        
        <div>
            <Nav></Nav>
            Login
            
            <form>
              <label htmlFor="username">Username</label>
              <input type="text" id="username"/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"/>
              <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default Login;