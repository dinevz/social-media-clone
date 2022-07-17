import { createContext, useContext, useState } from "react";

export const UserContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '',
        authToken: '',
        username: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
        about: '',
    });

    const onLogin = (result) => {
        setUser({
            id: result._id,
            authToken: result.accessToken,
            ...result,
        })
    };

    const onLogout = () => {
        setUser({
            id: '',
            authToken: '',
            username: 'anon',
            firstName: 'John',
            lastName: 'Doe',
        })
    }

    const onRegister = (result) => {
        onLogin(result);
    }
    return (
        <UserContext.Provider 
        value={{
            user,
            onLogin,
            onLogout,
            onRegister,
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    
    return useContext(UserContext);
}