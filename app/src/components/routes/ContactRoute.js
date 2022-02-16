import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';
import ContactChat from '../contact/ContactChat';
import UserChat from '../user/UserChat';

/**
 * Restricted admin routes
 * If the user is not an admin and wants to access
 * a certain route, redirect to the homepage
 */
const ContactRoute = () => {
    const {isLogged, user} = useContext(UserContext);
    return isLogged ? (user.email === "contact@library.com" ? <ContactChat /> : <UserChat />) : <Navigate to={routes.login}/>;
};

export default ContactRoute;