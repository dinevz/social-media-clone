import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext"



export const isAuthenticated = (Component) => {
    const WrappedComponent = (props) => {
        const { user } = useAuth();
        return user.accessToken 
        ? <Component {...props} />
        : <Navigate to='/login' />
    }
    return WrappedComponent;
}