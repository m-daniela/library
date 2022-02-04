import React, { createContext, useState } from 'react';
import { userLogin } from '../utils/serverCalls';

export const UserContext = createContext();

/**
 * The user context
 * Holds an object with the email and role
 * @returns 
 */
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const login = (email, password) => {
        userLogin(email, password)
            .then(data => {
                setUser(data);
            })
            .catch(console.log);
    }

    const logout = () => {

    }


    return <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>;
};

export default ContextProvider;
