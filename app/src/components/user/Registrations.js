import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import Registration from '../common/Registration';

/**
 * List all the books borrowed by a user
 * @returns 
 */
const Registrations = () => {
    const {myBooks} = useContext(BookContext);

    return <div className="homepage">
        <h2>Your books</h2>
        <div className="registrations">
            {myBooks?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}
        </div>
    </div>;
};

export default Registrations;
