import React, { createContext, useState } from 'react';
import { getBooks, getRegistrations } from '../utils/serverCalls';

export const BookContext = createContext();

const BookProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [myBooks, setMyBooks] = useState([]);

    const retrieveBooks = () => {
        getBooks()
            .then(data => {
                console.log(data);
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
                setBooks([]);
            });
    };

    const retrieveMyBooks = (email) => {
        getRegistrations(email)
            .then(data => {
                setMyBooks(data);
            })
            .catch(error => {
                console.log(error);
                setMyBooks([]);
            });
    };

    return <BookContext.Provider value={{books, retrieveBooks, myBooks, retrieveMyBooks}}>
        {children}
    </BookContext.Provider>;
};

export default BookProvider;
