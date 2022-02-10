import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';

/**
 * Restricted user routes
 * If the user is not logged in, redirect to the homepage
 */
const UserRoute = ({children}) => {
    const {isLogged} = useContext(UserContext);
    return isLogged ? children : <Navigate to={routes.login}/>;
};

export default UserRoute;