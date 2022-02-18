import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import ChangePassword from './ChangePassword';


const Profile = () => {
    const {user } = useContext(UserContext);

    return (
        <>
            <h2>Your profile</h2>
            <div className='profile'>
                <span>{user.email}</span>
                <span>{user.role}</span>
            </div>
            <ChangePassword />
        </>
    );
};

export default Profile;