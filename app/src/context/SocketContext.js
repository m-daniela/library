import React, { createContext, useContext, useEffect, useState } from 'react';
import {io} from "socket.io-client";
import { socketUrl } from '../utils/constants';
import { UserContext } from './UserContext';

/**
 * Socket context
 * Creates the connection and initializes the 
 * socket that will be used for the chat 
 */
export const SocketContext = createContext();

const SocketProvider = ({children}) => {
    const {user} = useContext(UserContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user){
            const socketInit = io(socketUrl, { path: "/socket/socket.io", transports: ['websocket', 'polling'], auth: user.email });
            socketInit.on("connect", () => console.log("connected", socketInit.id));
            socketInit.on("notification", (data) => console.log("notification", data)); 
            setSocket(socketInit);
        }
    }, [user]);


    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;