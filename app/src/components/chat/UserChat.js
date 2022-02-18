import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { ChatContext } from '../../context/ChatContext';
import { chatActions } from '../../reducers/chatReducer';
import { addContactMessage, getChatMessages } from '../../utils/serverCalls';

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

    useEffect(() => {
        getChatMessages(user.email)
            .then(data => {
                console.log(data);
                if (data?.length){
                    dispatch({type: chatActions.loadMessages, payload: {"contact": data}});
                }
            })
            .catch(error => {
                console.log(error);
            });
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
            <MessageList messages={chats.messages["contact"]}/>
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};

export default UserChat;