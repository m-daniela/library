import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Header = () => {
    const {logout} = useContext(UserContext);
    return <nav>
        <button onClick={logout}>Logout</button>
    </nav>;
};

export default Header;
