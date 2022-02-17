import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';
import { ChatContext } from '../../context/ChatContext';
import { chatActions } from '../../reducers/chatReducer';
import { addContactMessage } from '../../utils/serverCalls';

/**
 * User chat component
 * Contains the components for the normal chat
 * (MessageList, MessageInput) and sets the "on
 * message" event handler for the normal users
 * @returns 
 */
const UserChat = () => {
    const {user} = useContext(UserContext);
    const {socket} = useContext(SocketContext);
    const {chats, dispatch} = useContext(ChatContext);

    useEffect(() => {
        if (socket){
            socket.on("message", (data) => {
                dispatch({type: chatActions.addMessage, payload: {email: "contact", message: data}});
            });
        }
    }, []);

    const sendMessage = (message) => {
        if (socket){
            const preparedMessage = {
                text: message, 
                // time: Date.now(),
                sender: user.email,
                room: user.email, 
                receiver: "contact@library.com"
            };
            addContactMessage(preparedMessage);
            socket.emit("message", preparedMessage);
            dispatch({type: chatActions.addMessage, payload: {email: "contact", message: preparedMessage}});

        }
        
    };
    
    return (
        <div className='homepage'>
            <h2>Chat</h2>
            <span>Welcome to the chat</span>
            <MessageList messages={chats["contact"]}/>
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};

export default UserChat;