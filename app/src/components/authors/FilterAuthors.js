import React, {useState, useEffect} from 'react';
import { getAuthors } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import AuthorsList from './AuthorsList';

const FilterAuthors = ({removeFilters}) => {
    const [authors, setAuthors] = useState([]);
    const orderBy = ["name"];

    const filterAuthors = (query, sort, order, pg) => {
        getAuthors(query, sort, order)
            .then(data => {
                console.log(data);
                if (data?.length){
                    setAuthors(data);
                }
                else{
                    setAuthors([]);
                }
            })
            .catch(error => {
                console.log(error);
                setAuthors([]);
            });
        // .finally(() => {
        // // setIsFiltered(true);
        // // setIsLoading(false);
        // });
    };
    return (
        <>
            <AdvancedFilters filterBooks={filterAuthors} orderBy={orderBy} filters={[]} removeFilters={removeFilters}/>
            <AuthorsList authors={authors}/>
        </>
    );
};

export default FilterAuthors;