import {Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


function ProtectedRoute () {

    const LoggedIn = useAppSelector((state) => state.isLoggedIn.value)

    return (
        LoggedIn ? <Outlet /> : <Navigate to="/"/>
    )
}





export default ProtectedRoute;