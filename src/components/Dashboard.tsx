import Nav from "./Nav"
import {useLocation} from "react-router-dom";
import { FirebaseAuth } from "../firebase";
import { useEffect } from "react";
import { PhylloSDK } from "../phyllosdk";
import { useNavigate } from "react-router-dom";








function Dashboard () {

    
    const location = useLocation()
    const userEmail = location.state || localStorage.getItem("email")
    const firebaseAuth = new FirebaseAuth()
    const phylloSDK = new PhylloSDK()
    const navigate = useNavigate()
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let user = await firebaseAuth.getUser(userEmail);
                if (!user.data().accountID) {
                    const identity_ele = document.getElementById("identity");
                    identity_ele.hidden = true;
                    const engagement_ele = document.getElementById("engagement");
                    engagement_ele.hidden = true;
                    alert("You have to connect to Phyllo to move forward");
                } else {
                    console.log("Everything is working fine");
                    const phylloSync = document.getElementById("phylloSync")
                    phylloSync.hidden = true
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData(); // Invoke the function on component load
    }, []); // Empty dependency array ensures the effect runs only once on load
    
    

    async function handleClick(event) {
        
        let account_id = null;
        let user = await firebaseAuth.getUser(userEmail);
        const name = await user.data().name;
        const user_id = await user.data().user_id;
        const user_token = await phylloSDK.createToken(user_id);

        await phylloSDK.syncAccount(name, user_id, user_token)
           phylloSDK.account_id.addEventListener("start", (event:CustomEvent) => {
              account_id = event.detail;
              firebaseAuth.updateUser(userEmail, account_id)
              this.window.location.reload();
           })
        
    }
    async function handleIdentity () {
        let user = await firebaseAuth.getUser(userEmail);
        const account_id = await user.data().accountID;
        const identity = phylloSDK.getIdentity(account_id)
        console.log(identity)
    }
    async function handleEngagement () {
        let user = await firebaseAuth.getUser(userEmail);
        const account_id = await user.data().accountID;
        const engagement = await phylloSDK.getEngagement(account_id)
        // console.log(engagement.data.data.map(element => element.engagement.like_count))
        navigate('/Engagement', {state: engagement.data.data })
        
    }
    return(
        <div>
            <Nav />
            <h1>
                Dashboard
                </h1>
                <p>Welcome {userEmail}</p>
                <button id="phylloSync" onClick={handleClick}>Sync with Phyllo</button>
                <button id="identity" onClick={handleIdentity}>Identity</button>
                <button id="engagement" onClick={handleEngagement}>Engagement</button>
                
            
        </div>
    )
}

export default Dashboard;