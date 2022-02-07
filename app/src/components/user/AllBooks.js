import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { routes } from '../../utils/constants';
import Book from '../common/Book';

const AllBooks = () => {
    const {isLogged} = useContext(UserContext);
    const {books, retrieveBooks} = useContext(BookContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (isLogged){
            retrieveBooks();
        }
        else {
            navigate(routes.login);
        }
    }, []);

    return <div className="homepage">
        <h2>Available books</h2>
        <div className="all-books">
            {books?.map(book => <Book key={book.id} book={book}/>)}
        </div>
    </div>;
};

export default AllBooks;
