import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';
import ContactChat from '../contact/ContactChat';
import UserChat from '../chat/UserChat';

/**
 * Restricted contact route
 * If the user logs in with the contact email, 
 * show a more advanced chat page, otherwise 
 * show the normal user chat page
 * The user is redirected to the homepage if 
 * not logged in
 */
const ChatRoute = () => {
    const {isLogged, user} = useContext(UserContext);
    return isLogged ? (user.email === "contact@library.com" ? <ContactChat /> : <UserChat />) : <Navigate to={routes.login}/>;
};

export default ChatRoute;