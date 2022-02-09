import React, { useContext } from 'react';
import AdminHomepage from './admin/AdminHomepage';
import Login from './common/Login';
import UserHomepage from './user/UserHomepage';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {isLogged, user} = useContext(UserContext);

    return <>
        {isLogged ? 
            <>
                {user.role === "admin" ?
                    <AdminHomepage />
                    :
                    <UserHomepage />    
                }
            </>
            :
            <Login/>
        }
    </>;
};

export default Home;
