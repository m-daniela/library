import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { getFilteredBooks } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import Book from './Book';
import Spinner from 'react-bootstrap/Spinner';

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLogged){
            setIsLoading(true);
            retrieveBooks()
                .then(() => setIsLoading(false));
        }
    }, [isLogged]);

    const removeFilters = () =>{
        setIsFiltered(false);
    };

    const searchBooks = (query, sort, order, filter) => {
        setIsLoading(true);
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
                setIsLoading(false);
            });
    };


    return <>
        <h2>Available books</h2>
        <AdvancedFilters filterBooks={searchBooks} orderBy={orderBy} filters={filters} removeFilters={removeFilters}/>
        <div className="all-books">
            {
                isLoading ?
                    <Spinner animation="grow" />
                    :
                    <>
                        {
                            isFiltered? 

                                <>{filteredBooks?.map(book => <Book key={book.id} book={book}/>)}</>

                                :
                                <>{books?.map(book => <Book key={book.id} book={book}/>)}</>
                        }
                    </>
            }
            
        </div>
    </>;
};

export default AllBooks;
