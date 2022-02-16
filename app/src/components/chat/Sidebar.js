import React from 'react';

/**
 * Chats sidebar
 * This is available for the contact
 * user and it contains the active chats
 * @returns 
 */
const Sidebar = ({chats, selectChat}) => {
    
    return (
        <div className='side'>
            {chats?.map((email) => <div key={email} onClick={() => selectChat(email)}>{email}</div>)}
        </div>
    );
};

export default Sidebar;