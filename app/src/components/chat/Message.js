import React from "react";

/**
 * Message component
 * Display the message data
 * @param {*} param0 
 * @returns 
 */
const Message = ({message}) => {
    return <div className='message'>
        <span>{message.sender}</span>
        <div>{message.text}</div>
        {/* <span>{message.time}</span> */}
    </div>;
};

export default Message;