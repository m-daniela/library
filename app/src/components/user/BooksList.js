import React from 'react';
import Book from '../common/Book';

const BooksList = ({books, title}) => {
    return <div className="book-list">
        <p>{title}</p>
        {books?.map(book => <Book key={book.id} book={book}/>)}
    </div>;
};

export default BooksList;
