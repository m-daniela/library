import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers/chatReducer';

/**
 * Contact context
 * Holds the conversations for the context
 */
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [chats, dispatch] = useReducer(reducer, {});

    return (
        <ChatContext.Provider value={{chats, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;