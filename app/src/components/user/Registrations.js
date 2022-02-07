import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';
import Registration from '../common/Registration';

const Registrations = () => {
    const {user, isLogged} = useContext(UserContext);
    const {myBooks, retrieveMyBooks} = useContext(BookContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged){
            retrieveMyBooks(user.email);
        }
        else {
            navigate(routes.login);
        }
    }, []);

    return <div className="homepage">
        <h2>Your books</h2>
        <div className="registrations">
            {myBooks?.map(book => <Registration key={book.Book.id} registrationInfo={book}/>)}
        </div>
    </div>;
};

export default Registrations;
