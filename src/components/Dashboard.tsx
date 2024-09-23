import Nav from "./Nav"
import {useLocation} from "react-router-dom";









function Dashboard () {

    
    const location = useLocation()
  const user = location.state

    return(
        <div>
            <Nav />
            <h1>
                Dashboard
                </h1>
                <p>Welcome {user}</p>
                <button>Sync with Phyllo</button>
                <button>Identity</button>
                <button>Engagement</button>
                
            
        </div>
    )
}

export default Dashboard;