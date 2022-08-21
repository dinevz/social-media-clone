import { createContext, useContext, useState } from "react";
import * as profileService from '../services/profileService'


const UserContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        _id: '',
        accessToken: '',
        username: '',
        firstName: '',
        lastName: '',
        about: '',
        avatar: '',
    });

    const onLogin = (result) => {
        if(result.email === 'peter@abv.bg' || result.email === 'george@abv.bg' || result.email === 'admin@abv.bg') {
            profileService.createProfile(
                {   firstName: 'Test',
                    lastName: 'Anon',
                    about: 'bg',
                    username: result.username,
                    avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KIz3_UC1SOjPRGPn0PVw3AAAAA%26pid%3DApi&f=1',
                }, result.email, result.accessToken)
                .then(res => {
                    setUser({...res, accessToken: result.accessToken, _id: result._id})
                })
        } else {

            profileService.getProfile(result._id)
                .then(res => {
                    setUser({
                        ...res[0],
                        ...result,
                        _id: result._id,
                    })
                })
        }
    };

    const onLogout = () => {
        setUser({
            _id: '',
            accessToken: '',
            username: '',
            firstName: '',
            lastName: '',
            about: '',
            avatar: '',
        })
    }

    const onRegister = (result, accessToken, _id) => {
        setUser({...result, accessToken, _id});
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