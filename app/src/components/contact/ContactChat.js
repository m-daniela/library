import React, { useContext, useEffect, useState } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { SocketContext } from '../../context/SocketContext';
import { chatActions } from '../../reducers/chatReducer';
import MessageInput from '../chat/MessageInput';
import MessageList from '../chat/MessageList';
import Sidebar from '../chat/Sidebar';

const ContactChat = () => {
    const {chats, dispatch} = useContext(ContactContext);
    const {socket} = useContext(SocketContext);
    const [selectedChat, setSelectedChat] = useState("admin@mail.com");

    useEffect(() => {
        
        socket.on("message", (data) => {
            console.log(data, "from socket");
            dispatch({type: chatActions.addChat, payload: {email: data.sender, message: data}});
        });
    }, []);

    const sendMessage = (message) => {
        const preparedMessage = {
            text: message, 
            // time: Date.now(),
            sender: "contact@library.com", 
            receiver: selectedChat
        };

        console.log(preparedMessage, "client");
        socket.emit("message", preparedMessage);
    };



    return (
        <div className='homepage'>
            <Sidebar chats={Object.keys(chats)} selectChat={setSelectedChat} />
            {/* <>
                <MessageList messages={chats.selectChat} />
                <MessageInput sendMessage={sendMessage}/>
            </> */}
            { selectedChat.length !== 0 && 
                <>
                    <MessageList messages={chats[selectedChat]} />
                    <MessageInput sendMessage={sendMessage}/>
                </>
            }
        </div>
    );
};

export default ContactChat;