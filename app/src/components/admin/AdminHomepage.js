import React from 'react';
import { Link } from "react-router-dom";
import { routes } from '../../utils/constants';

const AdminHomepage = () => {

    return <div className="admin-homepage">
        <Link to={routes.register}>Add new user</Link>
        <Link to={routes.addBook}>Add new book</Link>
    </div>;
};

export default AdminHomepage;
