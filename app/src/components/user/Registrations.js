import React, { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import Registration from '../common/Registration';

/**
 * List all the books borrowed by a user
 * Get the books from the server and display them
 * @returns 
 */
const Registrations = () => {
    const {user, isLogged} = useContext(UserContext);
    const {myBooks, retrieveMyBooks} = useContext(BookContext);

    useEffect(() => {
        if (isLogged){
            retrieveMyBooks(user.email);
        }
    }, [isLogged]);

    return <div className="homepage">
        <h2>Your books</h2>
        <div className="registrations">
            {myBooks?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}
        </div>
    </div>;
};

export default Registrations;
