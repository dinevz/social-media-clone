import { createContext, useContext, useState } from "react";
import * as profileService from '../services/profileService'


const UserContext = createContext();

let adminAccounts = [
    '35c62d76-8152-4626-8712-eeb96381bea8',
    '60f0cf0b-34b0-4abd-9769-8c42f830dffc',
    '847ec027-f659-4086-8032-5173e2f9c93a',
]

const anonProfile = {
    firstName: 'John',
    lastName: 'Doe',
    about: 'Very anonymous person',
    avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.memegenerator.es%2Fimagenes%2Fmemes%2Fthumb%2F19%2F29%2F19291209.jpg&f=1&nofb=1',
}

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
        if (adminAccounts.includes(result._id)) {
            profileService.createProfile({...anonProfile, username: result.username}, result.accessToken)
            .then(res => {
                console.log(res);
                adminAccounts[res._ownerId] = '';
            })
            setUser({
                id: result._id,
                ...result,
                ...anonProfile
            })
        } else {
            
            setUser({
                id: result._id,
                ...result,
            })
        }
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