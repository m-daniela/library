import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';


const UserChat = () => {
    const {user} = useContext(UserContext);
    const {socket} = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            console.log(data, "from socket");
            setMessages([...messages, data]);
        });
    }, []);

    const sendMessage = (message) => {
        const preparedMessage = {
            text: message, 
            // time: Date.now(),
            sender: user.email,
            receiver: "contact@library.com"
        };

        console.log(preparedMessage, "client");
        socket.emit("message", preparedMessage);
    };
    
    return (
        <div className='homepage'>
            <h2>Chat</h2>
            <span>Welcome to the chat</span>
            <MessageList messages={messages}/>
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};

export default UserChat;