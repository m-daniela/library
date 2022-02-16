import React from 'react';
import Message from './Message';

/**
 * Message list
 * Display the list of messages
 * @returns 
 */
const MessageList = ({messages}) => {
    return (
        <div className='chat'>
            {messages?.map((message, index) => <Message key={index} message={message} />)}
        </div>
    );
};

export default MessageList;