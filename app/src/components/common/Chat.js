import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { socketUrl } from '../../utils/constants';

// the socket instance
let socket;

const Message = ({message}) => {
    return <div className='message'>
        <span>{message.sender}</span>
        <div>{message.text}</div>
        <span>{message.time}</span>
    </div>;
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    // const {messages, addMessage} = useContext(ChatContext);
    const [message, setMessage] = useState("");

    // socket logic on mount
    useEffect(() => {
        // initialize the socket if it isn't already
        if (!socket){
            socket = new WebSocket(socketUrl);
        }
        socket.onmessage = onMessage;

        socket.onopen = () => socket.send("Connected");
        return socket.onclose = () => socket.send("Disconnected");
    }, []);

    // get the message data
    const onMessage = (e) => {
        const socketMessage = JSON.parse(e.data);
        console.log(socketMessage, "socket");
        // const currentMessages = messages.slice();
        // currentMessages.push(socketMessage);
        // setMessages(currentMessages);
    };


    const handleMessage = (e) => {
        e.preventDefault();
        const preparedMessage = {
            text: message, 
            time: Date.now(),
            sender: "meh"
        };
        const currentMessages = messages.slice();
        currentMessages.push(preparedMessage);
        setMessages(currentMessages);
        console.log(preparedMessage, "client");

        socket.send(message);
        // socket.emit("message", message);
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