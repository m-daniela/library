import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { chatActions, reducer } from '../reducers/chatReducer';
import { getChatMessages, getContactChats } from '../utils/serverCalls';
import { UserContext } from './UserContext';

/**
 * Contact context
 * Holds the conversations for the context
 */
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const {user} = useContext(UserContext);
    const [chats, dispatch] = useReducer(reducer, {});

    // useEffect(() => {
    //     if (user){
    //         if (user.role === "contact"){
    //             getContactChats(user.token)
    //                 .then(data => {
    //                     dispatch({type: chatActions.load_data, payload: data});
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                 });
    //         }
    //         // else{
    //         //     getChatMessages(user.email, user.token)
    //         //         .then(data => {
    //         //             console.log(data);
    //         //             dispatch({type: chatActions.load_data, payload: data});
    //         //         })
    //         //         .catch(error => {
    //         //             console.log(error);
    //         //         });
    //         // }
           
    //     }
    // }, [user]);

    return (
        <ChatContext.Provider value={{chats, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;