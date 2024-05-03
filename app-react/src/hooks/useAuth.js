import React, { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import Cookies from 'react-cookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        () => {
            const userData = Cookies.load("user");
            return userData ? userData : null;
        }
    );

    useEffect(() => {
        if(user !== null) {
            Cookies.save("user", JSON.stringify(user), { path: "/"});
        } else {
            Cookies.remove("user", { path: "/"});
        }    
    }, [user]);

    const login = (userData) => {
        console.log(userData);
        setUser(userData);
    }
    
    const logout = () => {
        setUser(null);
    }

    return <AuthContext.Provider value={{ user, login, logout}}>{ children }</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}