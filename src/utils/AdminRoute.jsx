import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    
    // Verificar que el usuario esté logueado y sea admin
    if (!user) {
        return <Navigate to='/inicio-sesion'/>
    }
    
    if (user.rol !== 'admin') {
        return <Navigate to='/'/>
    }
    
    return children
}

export default AdminRoute
