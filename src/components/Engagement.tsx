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
        <>
        <img src={element.thumbnail_url} alt="thumbnail"></img>
            <ul> 
                
                <li> Title : {element.title} </li>
                <li> Published on: {element.published_at}</li>
               <li> Likes : {element.engagement.like_count }</li>
               <li> Saves : {element.engagement.save_count} </li>
               <li> Shares: {element.engagement.share_count}</li>
                
            </ul>
            </>
            )
            }
        
        </div>

    )
}

// console.log(engagement.data.data.map(element => element.engagement.like_count))
export default Engagement;