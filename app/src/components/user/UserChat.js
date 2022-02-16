import React from 'react';
import Chat from '../common/Chat';

const UserChat = () => {
    return (
        <div className='homepage'>
            <Chat receiver={ "contact@library.com"}/>
        </div>
    );
};

export default UserChat;