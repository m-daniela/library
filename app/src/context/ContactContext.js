import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from '../reducers/chatReducer';


export const ContactContext = createContext();

const ContactProvider = ({children}) => {
    const [chats, dispatch] = useReducer(reducer, initialState);
    return (
        <ContactContext.Provider value={{chats, dispatch}}>
            {children}
        </ContactContext.Provider>
    );
};

export default ContactProvider;