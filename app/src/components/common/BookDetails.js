import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Book details
 * Display the details about the book (title, description, cover
 * image) on another page
 * @returns 
 */
const BookDetails = () => {
    const {state} = useLocation();
    const book = state.book;

    return (
        <div className='book-details homepage'>
            <h2>{book.title}</h2>
            <img src={book.cover} alt="img"/>
            <div className='description'>{book.description}</div>
        </div>
    );
};

export default BookDetails;