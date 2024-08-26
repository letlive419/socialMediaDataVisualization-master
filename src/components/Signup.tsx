


function Signup() {

    function handleSubmit(event) {
        event.preventDefault()
        
    }
    return(
        <div>
            <h1> Register </h1>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="name">Enter your name</label>
              <input type="text" name="name"/>
              <label htmlFor="username">Username</label>
              <input type="text" name="username"/>
              <label htmlFor="password">Password</label>
              <input type="password" name="password"/>
              <label htmlFor="password">Retype Password</label>
              <input type="password" name="password"/>
              <button type="submit">Submit</button>
            </form>


        </div>
    )
}

export default Signup