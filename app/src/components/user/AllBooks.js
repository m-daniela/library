import React, { useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import Book from '../common/Book';

const AllBooks = () => {
    const {books, retrieveBooks} = useContext(BookContext);

    useEffect(() => {
        retrieveBooks();
    }, []);

    return <div className="all-books">
        <p>Avalable books</p>
        {books?.map(book => <Book key={book.id} book={book}/>)}
    </div>;
};

export default AllBooks;
