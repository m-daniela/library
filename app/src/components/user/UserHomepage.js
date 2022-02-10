import React from 'react';
import { Link } from "react-router-dom";
import { routes } from '../../utils/constants';


const UserHomepage = () => {

    return <div className="homepage">
        <Link to={routes.yourBooks}>Your books</Link>
        <Link to={routes.addBook}>Add book</Link>
        <Link to={routes.allBooks}>Get another book</Link>
    </div>;
};

export default UserHomepage;
