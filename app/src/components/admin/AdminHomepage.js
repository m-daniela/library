import React from 'react';
import { Link } from "react-router-dom";
import { routes } from '../../utils/constants';

/**
 * Admin homepage
 * Contains links to the pages an admin has 
 * access to
 * @returns 
 */
const AdminHomepage = () => {
    return <div className="homepage">
        <Link to={routes.register}>Add new user</Link>
        <Link to={routes.addBook}>Add new book</Link>
        <Link to={routes.yourBooks}>Your books</Link>
        <Link to={routes.allBooks}>Get another book</Link>
    </div>;
};

export default AdminHomepage;
