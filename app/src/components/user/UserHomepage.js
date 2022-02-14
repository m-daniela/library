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
        <Link to={routes.yourBooks}>Your books</Link>
        <Link to={routes.allBooks}>Get another book</Link>
        <Link to={routes.raport}>Get the borrowings raport</Link>
    </>;
};

export default UserHomepage;
