import React, { useContext } from 'react';
import AdminHomepage from './components/admin/AdminHomepage';
import Login from './components/common/Login';
import UserHomepage from './components/user/UserHomepage';
import { UserContext } from './context/UserContext';

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
