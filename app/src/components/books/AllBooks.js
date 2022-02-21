import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { getFilteredBooks } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import Book from './Book';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

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
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isLogged && !isFiltered){
            setIsLoading(true);
            retrieveBooks(currentPage)
                .then(() => setIsLoading(false));
        }
    }, [isLogged, currentPage]);


    const changePage = (page) => {
        if (!(page == -1 && currentPage == 1)){
            setCurrentPage(currentPage + page);
        }
    };

    const removeFilters = () =>{
        setIsFiltered(false);
        setCurrentPage(1);
    };

    const searchBooks = (query, sort, order, filter, page) => {
        setIsLoading(true);
        getFilteredBooks(query, sort, order, filter, page)
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
                        <Pagination className='mx-auto d-flex justify-content-center'>
                            <Pagination.Prev onClick={() => changePage(-1)}/>
                            <Pagination.Item>{currentPage}</Pagination.Item>
                            <Pagination.Next onClick={() => changePage(1)}/>
                        </Pagination>
                    </>
            }
            
        </div>
    </>;
};

export default AllBooks;
