import React, { useContext, useEffect, useState } from 'react';
import {io} from "socket.io-client";
import Message from './Message';
import { UserContext } from '../../context/UserContext';
import { socketUrl } from '../../utils/constants';
import { SocketContext } from '../../context/SocketContext';


const Chat = ({receiver}) => {
    const {user} = useContext(UserContext);
    const {socket} = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");


    const handleMessage = (e) => {
        e.preventDefault();
        const preparedMessage = {
            text: message, 
            // time: Date.now(),
            sender: user.email,
            receiver
        };

        console.log(preparedMessage, "client");
        socket.emit("message", preparedMessage);
    };
    
    return (
        <div className='homepage'>
            <h2>Chat</h2>
            <span>Welcome to the chat</span>
            <div className='chat'>
                {messages?.map((message, index) => <Message key={index} message={message} />)}
            </div>
            <form onSubmit={handleMessage}>
                <input value={message} onChange={e => setMessage(e.target.value)}/>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};

export default Chat;