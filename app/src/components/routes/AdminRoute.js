import React, { useContext } from 'react';
import {Navigate} from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';

/**
 * Restricted admin routes
 * If the user is not an admin and wants to access
 * a certain route, redirect to the homepage
 */
const AdminRoute = ({children}) => {
    const {isLogged, user} = useContext(UserContext);
    return isLogged && user.role == "admin" ? children : <Navigate to={routes.login} />;
};

export default AdminRoute;