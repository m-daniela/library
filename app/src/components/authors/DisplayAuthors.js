import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getAuthors } from '../../utils/serverCalls';
import AuthorsList from "./AuthorsList";
import FilterAuthors from './FilterAuthors';

/**
 * Display the list of authors
 * @returns 
 */

const DisplayAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (!isFiltered){
            setIsLoading(true);
            getAuthors()
                .then(data => {
                    console.log(data);
                    if (data){
                        setAuthors(data);
    
                    }
                })
                .catch(error => {
                    console.log(error);
                    setAuthors([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        
    }, [isFiltered]);

    const removeFilters = () => {
        setIsFiltered(false);
    };
    
    return (
        <>
            <h2>All authors</h2>
            {
                isFiltered ?

                    <FilterAuthors removeFilters={removeFilters}/>
                    :
                    <>
                        <Button onClick={() => setIsFiltered(true)}>Filter authors</Button>
                        <AuthorsList authors={authors} isLoading={isLoading}/>
                    </>
            }
        </>
    );
};

export default DisplayAuthors;