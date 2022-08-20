import { createContext, useContext, useState } from "react";
import * as profileService from '../services/profileService'


const UserContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: '',
        accessToken: '',
        username: '',
        firstName: '',
        lastName: '',
        about: '',
        avatar: '',
    });

    const onLogin = (result) => {
        profileService.getProfile(result._id)
            .then(res => {
                setUser({
                    ...res[0],
                    ...result,
                    _id: result._id,
                })
            })
    };

    const onLogout = () => {
        setUser({
            id: '',
            accessToken: '',
            username: '',
            firstName: '',
            lastName: '',
            about: '',
            avatar: '',
        })
    }

    const onRegister = (result) => {
        onLogin(result);
    }

    const setProfileToUser = (result) => {
        setUser({ ...result, ...user })
    }

    return (
        <UserContext.Provider
            value={{
                user,
                onLogin,
                onLogout,
                onRegister,
                setProfileToUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {

    return useContext(UserContext);
}