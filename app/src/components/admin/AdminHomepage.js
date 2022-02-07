import React from 'react';
import { useNavigate } from "react-router-dom";
import { routes } from '../../utils/constants';

const AdminHomepage = () => {
    const navigate = useNavigate();

    return <div className="admin-homepage">
        <button onClick={() => navigate(routes.register)}>Add new user</button>
        <button onClick={() => navigate(routes.addBook)}>Add new book</button>

    </div>;
};

export default AdminHomepage;
