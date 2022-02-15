import React, { createContext, useState } from 'react';


/**
 * Chat context
 * Hold the messages here, for now
 */
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
    // const [messages, setMessages] = useState([]);
    const messages = [];

    const addMessage = (message) =>{
        console.log(messages);
        messages.push(message);
        // setMessages([...messages, message]);
    };

    return (
        <ChatContext.Provider value={{messages, addMessage}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;