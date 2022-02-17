import React from 'react';

/**
 * Chats sidebar
 * This is available for the contact
 * user and it contains the active chats
 * @returns 
 */
const Sidebar = ({chats, retrieveMessages}) => {
    console.log(chats);
    return (
        <div className='side'>
            {chats?.map(chat => <div key={chat.room_name} onClick={() => retrieveMessages(chat.room_name)}>{chat.room_name}</div>)}
        </div>
    );
};

export default Sidebar;