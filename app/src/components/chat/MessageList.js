import React from 'react';
import Message from './Message';

/**
 * Message list
 * Display the list of messages given by 
 * the parent component
 * @returns 
 */
const MessageList = ({messages}) => {
    console.log(messages);
    return (
        <div className='chat'>
            {messages?.map((message, index) => <Message key={index} message={message} />)}
        </div>
    );
};

export default MessageList;