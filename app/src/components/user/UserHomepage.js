import React from 'react';
import { useNavigate } from "react-router-dom";
import { routes } from '../../utils/constants';


const UserHomepage = () => {
    const navigate = useNavigate();

    return <div className="user-homepage">
        <p>User</p>
        <button onClick={() => navigate(routes.yourBooks)}>Your books</button>
        <button onClick={() => navigate(routes.allBooks)}>Get another book</button>

    </div>;
};

export default UserHomepage;
