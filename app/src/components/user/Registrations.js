import React, { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import Registration from '../common/Registration';

const Registrations = () => {
    const {user} = useContext(UserContext);
    const {myBooks, retrieveMyBooks} = useContext(BookContext);

    useEffect(() => {
        retrieveMyBooks(user.email);
    }, []);


    return <div className="registrations">
        {myBooks?.map(book => <Registration key={book.Book.id} registrationInfo={book}/>)}

    </div>;
};

export default Registrations;
