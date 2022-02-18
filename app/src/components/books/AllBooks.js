import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { getFilteredBooks } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import Book from './Book';

/**
 * List all the books
 * Get the books from the server and display them
 * @returns 
 */
const AllBooks = () => {
    const {isLogged} = useContext(UserContext);
    const {books, retrieveBooks} = useContext(BookContext);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const orderBy = ["title", "stock"];
    const filters = ["availability"];
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (isLogged){
            retrieveBooks();
        }
    }, [isLogged]);

    const removeFilters = () =>{
        setIsFiltered(false);
    };

    const searchBooks = (query, sort, order, filter) => {
        getFilteredBooks(query, sort, order, filter)
            .then(data => {
                if (data?.length){
                    setFilteredBooks(data);
                }
                else{
                    setFilteredBooks([]);
                }
            })
            .catch(error => {
                console.log(error);
                setFilteredBooks([]);
            })
            .finally(() => {
                setIsFiltered(true);
            });
    };


    return <div className="homepage">
        <h2>Available books</h2>
        <AdvancedFilters filterBooks={searchBooks} orderBy={orderBy} filters={filters}/>
        <button onClick={removeFilters}>Display all books</button>
        <div className="all-books">
            {
                isFiltered? 
                    <>{filteredBooks?.map(book => <Book key={book.id} book={book}/>)}</>
                    :
                    <>{books?.map(book => <Book key={book.id} book={book}/>)}</>
            }
        </div>
    </div>;
};

export default AllBooks;
