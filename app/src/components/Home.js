import React, { useContext } from 'react';
import {Navigate} from "react-router-dom";
import AdminHomepage from './admin/AdminHomepage';
import Login from './common/Login';
import UserHomepage from './user/UserHomepage';
import { UserContext } from '../context/UserContext';
import { routes } from '../utils/constants';

/**
 * Home page
 * Display the corresponding page based on 
 * user permissions or display login page
 * if the user is not logged in
 * @returns 
 */
const Home = () => {
    const {isLogged, user} = useContext(UserContext);

    return <div className='homepage'>
        {isLogged ? 
            <>
                {user.role === "admin" && <AdminHomepage />}
                {user.role === "contact" && <Navigate to={routes.chat} />}
                {user.role === "user" && <UserHomepage />}
            </>
            :
            <Login/>
        }
    </div>;
};

export default Home;
