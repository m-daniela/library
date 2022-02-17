import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import { chatActions } from '../../reducers/chatReducer';
import { addContactMessage, getChatMessages, getContactChats } from '../../utils/serverCalls';
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


    const retrieveMessages = (chat) => {
        setSelectedChat(chat);
        if (!chats.messages[chat]){
            getChatMessages(chat)
                .then(data => {
                    // console.log(data);
                    if (data?.length){
                        dispatch({type: chatActions.loadMessages, payload: {[chat]: data}});
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const sendMessage = (message) => {
        if(socket){
            const preparedMessage = {
                text: message, 
                // time: Date.now(),
                sender: "contact@library.com", 
                room: selectedChat,
                receiver: selectedChat
            };
            // add the message to the list 
            dispatch({type: chatActions.addMessage, payload: {email: selectedChat, message: preparedMessage}});

            socket.emit("message", preparedMessage);
            addContactMessage(preparedMessage);
        }
    };



    return (
        <div className='homepage'>
            <h2>Chat</h2>
            <span>Select a chat from the sidebar</span>
            <div className='contact-chat'>
                <Sidebar chats={chats.chats} retrieveMessages={retrieveMessages} />
                { selectedChat.length !== 0 && 
                <div>
                    <MessageList messages={chats.messages[selectedChat]} />
                    <MessageInput sendMessage={sendMessage}/>
                </div>
                }
            </div>
            
        </div>
    );
};

export default ContactChat;