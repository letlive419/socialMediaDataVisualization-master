import Nav from "./Nav";
import React from "react";
import {useLocation} from "react-router-dom";


function Engagement() {
    const location = useLocation()
    console.log(location.state)
    return(
        <div>
        <Nav/>
        {location.state.map(element => 
            <p> Likes : {element.engagement.like_count }</p>)
            }
        
        </div>

    )
}

// console.log(engagement.data.data.map(element => element.engagement.like_count))
export default Engagement;