import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    
    // Si el usuario está logueado, redirigir al home
    if (user) {
        return <Navigate to='/'/>
    }
    
    return children
}

export default PublicRoute