import React from 'react';

/**
 * Book details
 * Display the details about the book (title, description, cover
 * image) on another page
 * @returns 
 */
const BookDetails = ({book}) => {
    return (
        <div className='book-details'>
            <h2>{book.title}</h2>
            <img src={book.cover} alt="img"/>
            <div>{book.description}</div>
        </div>
    );
};

export default BookDetails;