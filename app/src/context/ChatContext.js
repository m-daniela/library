import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { chatActions, initialState, reducer } from '../reducers/chatReducer';
import { getChatMessages, getContactChats } from '../utils/serverCalls';
import { UserContext } from './UserContext';

/**
 * Contact context
 * Holds the conversations for the context
 */
export const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const {user} = useContext(UserContext);
    const [chats, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (user){
            if (user.role === "contact"){
                getContactChats(user.token)
                    .then(data => {
                        if (data?.length){
                            dispatch({type: chatActions.loadData, payload: data});
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }, [user]);

    return (
        <ChatContext.Provider value={{chats, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;