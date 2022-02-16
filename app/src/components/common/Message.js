import React from "react";

const Message = ({message}) => {
    return <div className='message'>
        <span>{message.sender}</span>
        <div>{message.text}</div>
        {/* <span>{message.time}</span> */}
    </div>;
};

export default Message;