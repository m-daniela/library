import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ContactChat from '../contact/ContactChat';
import UserChat from '../user/UserChat';

/**
 * Restricted admin routes
 * If the user is not an admin and wants to access
 * a certain route, redirect to the homepage
 */
const ContactRoute = () => {
    const {isLogged, user} = useContext(UserContext);
    return isLogged && user.email === "contact@library.com" ? <ContactChat /> : <UserChat />;
};

export default ContactRoute;