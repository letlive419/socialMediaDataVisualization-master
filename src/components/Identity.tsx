import { useLocation } from "react-router-dom"
import Nav from "./Nav";



function Identity() {


    const location = useLocation()

    //write methods here



    return (
        <div>
            <Nav/>
            <p>Username: {location.state.account.platform_username} </p>
            <p>Audience Distribution: </p>
            {location.state.gender_age_distribution.map(element => 
                
                <>
                <ul>
                <li>Gender: {element.gender}</li>
                <li>Age Range: {element.age_range}</li>
                </ul>
                </>
            )}
            
        </div>
    )
}
// console.log(identity.account.platform_username)

export default Identity;