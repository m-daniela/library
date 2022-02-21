import React from 'react';
import { Link } from "react-router-dom";
import { routes } from '../../utils/constants';

/**
 * User homepage
 * Contains links to the pages a user has 
 * access to
 * @returns 
 */
const UserHomepage = ({children}) => {

    return <>
        {children}
        <h2>Books</h2>
        <Link to={routes.yourBooks}>Your books</Link>
        <Link to={routes.allBooks}>Display all book</Link>
        <Link to={routes.authors}>Display all authors</Link>

        <Link to={routes.report}>Get your borrowings report</Link>
    </>;
};

export default UserHomepage;
