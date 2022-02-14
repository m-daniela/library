import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { getSearchedBooks } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import Book from '../common/Book';

/**
 * List all the books
 * Get the books from the server and display them
 * @returns 
 */
const AllBooks = () => {
    const {isLogged} = useContext(UserContext);
    const {books, retrieveBooks} = useContext(BookContext);
    const [filteredBooks, setFilteredBooks] = useState([]);
    // const [message, setMessage] = useState("");


    useEffect(() => {
        if (isLogged){
            retrieveBooks();
        }
    }, [isLogged]);


    const searchBooks = (query, sort, order) => {
        getSearchedBooks(query, sort, order)
            .then(data => {
                console.log(data);
                if (data?.length){
                    setFilteredBooks(data);
                }
            })
            .catch(error => {
                console.log(error);
                setFilteredBooks([]);
            });
    };


    return <div className="homepage">
        <h2>Available books</h2>
        <AdvancedFilters filterBooks={searchBooks}/>
        <div className="all-books">
            {
                filteredBooks.length === 0 ? 
                    <>{books?.map(book => <Book key={book.id} book={book}/>)}</>
                    :
                    <>{filteredBooks?.map(book => <Book key={book.id} book={book}/>)}</>
                
            }
            
        </div>
    </div>;
};

export default AllBooks;
