import axios from "axios";


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

export class PhylloSDK {
   
   
  

getIdentity = async(accountid) => {
    const response = await api.get(`https://api.staging.getphyllo.com/v1/profiles?account_id=${accountid}`, {
        headers:{
        Authorization: "Basic MzAxOTdlM2MtZmU5My00MjdiLTk4ZjItN2NkOWIwZTYyZWVkOjA2YTA5MjdlLWM4MDEtNDExMS04NDE1LTA0OWE1MzcwODhhMg==",
        ContentType: "application/json"
        }
    })
    console.log(response)
}

getEngagement = async(accountid) => {
    const response = await api.get(`https://api.staging.getphyllo.com/v1/contents?account_id=${accountid}`, {
        headers:{
        Authorization: "Basic MzAxOTdlM2MtZmU5My00MjdiLTk4ZjItN2NkOWIwZTYyZWVkOjA2YTA5MjdlLWM4MDEtNDExMS04NDE1LTA0OWE1MzcwODhhMg==",
        ContentType: "application/json"
        }
    })
    console.log(response)
}

getComments = async(accountid) => {
    const response = await api.get(`https://api.staging.getphyllo.com/v1/comments?account_id=${accountid}`, {
        headers:{
        Authorization: "Basic MzAxOTdlM2MtZmU5My00MjdiLTk4ZjItN2NkOWIwZTYyZWVkOjA2YTA5MjdlLWM4MDEtNDExMS04NDE1LTA0OWE1MzcwODhhMg==",
        ContentType: "application/json"
        }
    })
    console.log(response)
}

    
createUserAndToken = async(name, uid) => {

    let account_id = ""
    try 
       {
        
        console.log("Fetching user_id")
        const createUserResponse = await api.post(URLCreateUser,{
            name: name,
            external_id: uid, 
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
            clientDisplayName: name,
            environment: "staging",
            userId: user_id,
            token:user_token, 
            redirect: false,
        }

        
       
      
        const phylloConnect =  window.PhylloConnect.initialize(config);
        
       
    
        phylloConnect.on("accountConnected", (accountId, workplatformId, userId) => {
            console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
            account_id = accountId;
            this.accountConnected = () => {
                return account_id
            }
        })
            
    
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

}