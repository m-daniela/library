import React, { createContext, useContext, useEffect } from 'react';
import {io} from "socket.io-client";
import { socketUrl } from '../utils/constants';
import { UserContext } from './UserContext';


let socket;

export const SocketContext = createContext();

const SocketProvider = ({children}) => {
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user){
            // initialize the socket if it isn't already
            if (!socket){
                socket = io(socketUrl, { path: "/socket/socket.io", transports: ['websocket', 'polling'], auth: user.email });
            }
            socket.on("connect", () => console.log("connected", socket.id)); 

        }
        

        
    }, [user]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;