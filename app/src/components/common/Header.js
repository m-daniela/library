import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';

const Header = () => {
    const {user, logout} = useContext(UserContext);
    return <nav>
        <Link to={routes.login}>Home</Link>
        {user && <>
            <span>{user.email} as {user.role}</span>
            <button onClick={logout}>Logout</button>
        </>}
    </nav>;
};

export default Header;
