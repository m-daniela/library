import React, { useState } from 'react';

/**
 * Message input
 * Sends the message to the parent component
 * to handle the sending part
 * @param {*} sendMessage 
 * @returns 
 */
const MessageInput = ({sendMessage}) => {
    const [message, setMessage] = useState("");

    const handleMessage = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleMessage}>
            <input required value={message} onChange={e => setMessage(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
    );
};

export default MessageInput;