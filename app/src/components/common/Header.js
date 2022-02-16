import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import { chatActions } from '../../reducers/chatReducer';
import { routes } from '../../utils/constants';

const Header = () => {
    const {user, logout} = useContext(UserContext);
    const {dispatch} = useContext(ChatContext);

    // clear the chat messages before logout
    const handleLogout = () => {
        dispatch({type: chatActions.clear});
        logout();
    };
    
    return <nav>
        <Link to={routes.login}>Home</Link>
        {user && <>
            <Link to={routes.changePassword}>{user.email} as {user.role}</Link>
            <Link to={routes.chat}>Chat</Link>
            <button onClick={handleLogout}>Logout</button>
        </>}
    </nav>;
};

export default Header;
