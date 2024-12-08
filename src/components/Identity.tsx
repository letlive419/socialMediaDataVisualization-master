import { useLocation } from "react-router-dom"
import Nav from "./Nav";



function Identity() {


    const location = useLocation()

    //write methods here



    return (
        <div>
            <Nav/>
            
            <h2>Username: {location.state.account.platform_username} </h2>
            <h3>Audience Distribution: </h3>
            
            {location.state.gender_age_distribution.map((element,index) => 
                
                <div className="identity-div">
                <ul>
                <li>Item #{index + 1}</li>
                <li>Gender: {element.gender}</li>
                <li>Age Range: {element.age_range}</li>
                </ul>
                </div>
            )}
            
            
            
        </div>
    )
}
// console.log(identity.account.platform_username)

export default Identity;