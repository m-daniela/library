import React, { createContext, useEffect, useState } from 'react';
import { userLogin } from '../utils/serverCalls';

export const UserContext = createContext();

/**
 * The user context
 * Holds an object with the email and role
 */
const UserProvider = ({ children }) => {
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
                token: localStorage.getItem("token")
            };
            setUser(loggedUser);
            setIsLogged(true);
        }
    }, []);

    const login = (email, password) => {
        userLogin(email, password)
            .then(data => {
                setUser(data);
                setIsLogged(true);

                localStorage.setItem("email", data.email);
                localStorage.setItem("role", data.role);
                localStorage.setItem("token", data.token);
            })
            .catch(console.log);
    };

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setUser(null);
        setIsLogged(false);
    };


    return <UserContext.Provider value={{ user, login, logout, isLogged, setIsLogged }}>
        {children}
    </UserContext.Provider>;
};

export default UserProvider;
