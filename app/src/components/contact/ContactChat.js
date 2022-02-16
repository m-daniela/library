import React, { useContext, useEffect } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { SocketContext } from '../../context/SocketContext';
import { chatActions } from '../../reducers/chatReducer';
import Chat from '../common/Chat';

const ContactChat = () => {
    const {chats, dispatch} = useContext(ContactContext);
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        
        socket.on("message", (data) => {
            console.log(data, "from socket");
            dispatch({type: chatActions.addChat, payload: {email: data.sender, message: data}});
        });
    }, []);



    return (
        <div>
            21332
            {Object.keys(chats).map(chat => console.log(chat))}
            <Chat receiver={"acd"}/>
        </div>
    );
};

export default ContactChat;