import React from 'react';
import { Link } from "react-router-dom";
import { routes } from '../../utils/constants';
import UserHomepage from '../user/UserHomepage';

/**
 * Admin homepage
 * Contains links to the pages an admin has 
 * access to
 * @returns 
 */
const AdminHomepage = () => {
    return <UserHomepage>
        <Link to={routes.register}>Add new user</Link>
        <Link to={routes.addBook}>Add new book</Link>
        <Link to={routes.userRegistrations}>Search for a user</Link>
    </UserHomepage>;
};

export default AdminHomepage;
