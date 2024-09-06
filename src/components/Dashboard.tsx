import Nav from "./Nav"
import axios from "axios";
import {v4 as uuidv4} from "uuid";








function Dashboard () {

    

    /*URLs*/
    const BASEURL = "https://api.staging.getphyllo.com"
    const URLCreateUser = "/v1/users"
    const URLCreateToken = "/v1/sdk-tokens"

   
    
    const api = axios.create({
        baseURL: BASEURL,
        auth: {
            "username":process.env.REACT_APP_PHYLLO_CLIENT_ID,
            "password":process.env.REACT_APP_PHYLLO_SECRET,
        },
    })
    
const Login = async() => {

    try 
       {
        console.log("Fetching user_id")
        const createUserResponse = await api.post(URLCreateUser,{
            name: 'Elvis Cruz',
            external_id: uuidv4(),
       })
       const user_id = createUserResponse.data.id
       console.log(`Completed fetching user_id ${user_id}`)
       
        
       console.log("Fetching token")
        const createTokenResponse = await api.post(
            URLCreateToken, {
                user_id: user_id,
                products: [
                    "IDENTITY",
                    "IDENTITY.AUDIENCE",
                    "ENGAGEMENT",
                    "ENGAGEMENT.AUDIENCE",
                    "INCOME",
                    "ACTIVITY"
                ]
        })
        const user_token = createTokenResponse.data.sdk_token;
        console.log(`Completed fetching ${user_token}`)
        
     
    
   

    const config = {
        clientDisplayName: "Elvis Cruz",
        environment: "staging",
        userId: user_id,
        token:user_token, 
        redirect: false,
    }
    const phylloConnect =  window.PhylloConnect.initialize(config);
    console.log(config)
        
         
    phylloConnect.on("accountConnected",(accountId:any, workplatformId:any, userid:any) => {
    console.log(`on account connected: ${accountId}, ${workplatformId}, ${userid}`)
    });

    phylloConnect.on("accountDisconnected", (accountId, workplatformId, userId) => {  // gives the successfully disconnected account ID and work platform ID for the given user ID
        console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
      })
      phylloConnect.on("tokenExpired", (userId) => {  // gives the user ID for which the token has expired
        console.log(`onTokenExpired: ${userId}`);  // the SDK closes automatically in case the token has expired, and you need to handle this by showing an appropriate UI and messaging to the users
      })
      phylloConnect.on("exit", (reason, userId) => {  // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it
        console.log(`onExit: ${reason}, ${userId}`);
      })
      phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {  // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it
        console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
      })
    phylloConnect.open()
       }

   
    catch(error) {
        console.log(`Error occurred, please see the following for more details ${error.message}`)
    }
}

    return(
        <div>
            <Nav />
            <h1>
                Dashboard
                <button onClick = {Login}>Login</button>
            </h1>
        </div>
    )
}

export default Dashboard;