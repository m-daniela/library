import React, { createContext, useEffect, useState } from 'react';
import { userLogin } from '../utils/serverCalls';

export const UserContext = createContext();

/**
 * The user context
 * Holds an object with the email, role and JWT
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

    const login = async (email, password) => {
        return userLogin(email, password)
            .then(data => {
                setUser(data);
                setIsLogged(true);

                localStorage.setItem("email", data.email);
                localStorage.setItem("role", data.role);
                localStorage.setItem("token", data.token);
                return data.message;
            })
            .catch(error => {
                throw error.detail;
            });
    };

    const updateToken = (token) => {
        setUser({
            ...user, 
            token
        });
        localStorage.setItem("token", token);
    };

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setUser(null);
        setIsLogged(false);
    };


    return <UserContext.Provider value={{ user, login, logout, isLogged, setIsLogged, updateToken }}>
        {children}
    </UserContext.Provider>;
};

export default UserProvider;
