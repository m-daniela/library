import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form onSubmit={handleMessage}>
            <Form.Control required value={message} onChange={e => setMessage(e.target.value)}/>
            <Button type='submit'>Send</Button>
        </Form>
    );
};

export default MessageInput;