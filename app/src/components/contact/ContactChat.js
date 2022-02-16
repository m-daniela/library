import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import { chatActions } from '../../reducers/chatReducer';
import { getContactChats } from '../../utils/serverCalls';
import MessageInput from '../chat/MessageInput';
import MessageList from '../chat/MessageList';
import Sidebar from '../chat/Sidebar';

/**
 * Contact chat component
 * Contains the components for the advanced chat
 * (Sidebar, MessageList, MessageInput) and sets
 * the "on message" handler for the contact user
 * @returns 
 */
const ContactChat = () => {
    const {user} = useContext(UserContext);
    const {chats, dispatch} = useContext(ChatContext);
    const {socket} = useContext(SocketContext);
    const [selectedChat, setSelectedChat] = useState("");

    useEffect(() => {
        if (socket){
            // add the "on message" event handler 
            socket.on("message", (data) => {
                dispatch({type: chatActions.addMessage, payload: {email: data.sender, message: data}});
            });
        }
    }, []);

    useEffect(() => {
        if (user){
            console.log(user.token, 111);
            getContactChats(user.token);
        }
        
    }, [user]);

    const sendMessage = (message) => {
        if(socket){
            const preparedMessage = {
                text: message, 
                // time: Date.now(),
                sender: "contact@library.com", 
                receiver: selectedChat
            };
            // add the message to the list 
            dispatch({type: chatActions.addMessage, payload: {email: selectedChat, message: preparedMessage}});

            socket.emit("message", preparedMessage);
        }
    };



    return (
        <div className='homepage'>
            <h2>Chat</h2>
            <span>Select a chat from the sidebar</span>
            <div className='contact-chat'>
                <Sidebar chats={Object.keys(chats)} selectChat={setSelectedChat} />
                { selectedChat.length !== 0 && 
                <div>
                    <MessageList messages={chats[selectedChat]} />
                    <MessageInput sendMessage={sendMessage}/>
                </div>
                }
            </div>
            
        </div>
    );
};

export default ContactChat;