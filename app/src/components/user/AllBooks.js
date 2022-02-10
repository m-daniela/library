import React, { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import Book from '../common/Book';

/**
 * List all the books
 * Get the books from the server and display them
 * @returns 
 */
const AllBooks = () => {
    const {isLogged} = useContext(UserContext);
    const {books, retrieveBooks} = useContext(BookContext);

    useEffect(() => {
        if (isLogged){
            retrieveBooks();
        }
    }, [isLogged]);

    return <div className="homepage">
        <h2>Available books</h2>
        <div className="all-books">
            {books?.map(book => <Book key={book.id} book={book}/>)}
        </div>
    </div>;
};

export default AllBooks;
