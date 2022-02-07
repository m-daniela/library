import React, { createContext, useEffect, useState } from 'react';
import { userLogin } from '../utils/serverCalls';

export const UserContext = createContext();

/**
 * The user context
 * Holds an object with the email and role
 * @returns 
 */
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() =>{
        const email = localStorage.getItem("email");
        if (!email) {
            setIsLogged(false);
        }
        else{
            const loggedUser = {
                email,
                role: localStorage.getItem("role"), 
                permissions: localStorage.getItem("permissions")
            };
            setUser(loggedUser);
            setIsLogged(true);
            console.log(email, isLogged);
        }
    }, []);

    const login = (email, password) => {
        userLogin(email, password)
            .then(data => {
                console.log(data);
                setUser(data);
                setIsLogged(true);
                // save to localstorage for now
                localStorage.setItem("email", data.email);
                localStorage.setItem("role", data.role);
                localStorage.setItem("permissions", data.permissions);
            })
            .catch(console.log);
    };

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("permissions");
        setUser(null);
        setIsLogged(false);
    };


    return <UserContext.Provider value={{ user, login, logout, isLogged, setIsLogged }}>
        {children}
    </UserContext.Provider>;
};

export default ContextProvider;
