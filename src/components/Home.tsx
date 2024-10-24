import Nav from "../components/Nav"
import {Link} from "react-router-dom"



function Home () {
    
   
    return(
    <>
    <Nav></Nav>
        <div className="homepage-div">
            
            <h1 className="title"><b>Drive real business impact <br/> 
            with real-time social insights.<br/> 
            <span className="text-red">GorillaKing  makes it easy </span></b>
            </h1>
            <p className="title-text">No more ping-ponging between tabs, making guesses about what works, or taming a messy inbox. GorillaKing brings <br/> it all to one place so you can <b>use data to inform your social media strategy.</b></p>
           <Link to="Signup"> <button className="register-btn2">Register Here!</button></Link>
        </div>
        <div>
            <img className="main-image" src="https://cdn.pixabay.com/photo/2016/06/03/07/58/social-media-1432937_1280.jpg" alt="helper"></img>
            <div className="logos">
            <img src="https://www.hootsuite.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fta4ffdi8h2om%2F4foswTZ7w7zALnY6m2Ljmn%2Fdb540d1966bdefeaef7e825011359471%2FRectangle_123__1_.png&w=256&q=75"></img>
            <img src="https://www.hootsuite.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fta4ffdi8h2om%2F71u0zWnqbyDqtXb1pSUJol%2Feb0afb1a8e9e2b8eea5751667a810323%2FRectangle_132.png&w=256&q=75"></img>
            <img src="https://www.hootsuite.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fta4ffdi8h2om%2F7iT6sDNYXJWXWX4ecLSWNl%2Fbc72ec96b618f87a8a1b6baa9fc19178%2Flogo-homepage-adobe-336x118.png&w=256&q=75"></img>
            </div>
            
        </div>
        </>
    )
}

export default Home;

