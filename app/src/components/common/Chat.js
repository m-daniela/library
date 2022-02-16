import React, { useContext, useEffect, useState } from 'react';
import {io} from "socket.io-client";
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import { socketUrl } from '../../utils/constants';

// the socket instance
let socket;

const Message = ({message}) => {
    return <div className='message'>
        <span>{message.sender}</span>
        <div>{message.text}</div>
        {/* <span>{message.time}</span> */}
    </div>;
};

const Chat = () => {
    const {user} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // socket logic on mount
    useEffect(() => {
        // initialize the socket if it isn't already
        if (!socket){
            // socket = new WebSocket(socketUrl);
            socket = io(socketUrl, { path: "/socket/socket.io", transports: ['websocket', 'polling'] });
            // socket = io.connect(socketUrl);
        }
        socket.on("connect", () => console.log("connected", socket.id)); 
        // bind the message handler
        // socket.onmessage = onMessage;

        // send a message when the user connects
        // socket.onopen = () => socket.send("Connected");

        // send a message when the user disconnects 
        // return socket.onclose = () => socket.send(JSON.stringify({message: "Disconnected"}));
        return socket.on("disconnect", () => console.log("disconnected", socket.id)); 
        
    }, []);


    useEffect(() => {
        socket.on("message", (data) => {
            console.log(data, "from socket");
        });
    }, [socket]);

    // get the message data when a message is received
    const onMessage = (e) => {
        const socketMessage = JSON.parse(e.data);
        console.log(socketMessage, "socket");
        // if the receiver is the current user, add
        // the message to the list
        if (socketMessage.receiver === user.email){
            
            setMessages([...messages, socketMessage]);
        }
    };


    const handleMessage = (e) => {
        e.preventDefault();
        const preparedMessage = {
            text: message, 
            // time: Date.now(),
            sender: user.email,
            receiver: "contact@library.com"
        };
        // setMessages([...messages, preparedMessage]);

        // const currentMessages = messages.slice();
        // currentMessages.push(preparedMessage);
        // setMessages(currentMessages);
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