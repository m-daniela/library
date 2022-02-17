import React, { useContext, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { getFilteredRegistrations } from '../../utils/serverCalls';
import AdvancedFilters from '../common/AdvancedFilters';
import Registration from '../common/Registration';

/**
 * List all the books borrowed by a user
 * @returns 
 */
const Registrations = () => {
    const {myBooks} = useContext(BookContext);
    const {user} = useContext(UserContext);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const orderBy = ["checkin", "checkout", "title"];
    const filters = ["checkedout"];

    const removeFilters = () =>{
        setIsFiltered(false);
    };

    const searchBooks = (query, sort, order, filter) => {
        getFilteredRegistrations(user.email, query, sort, order, filter)
            .then(data => {
                console.log(data);
                if (data?.length){
                    setFilteredRegistrations(data);
                }
                else{
                    setFilteredRegistrations([]);
                }
            })
            .catch(error => {
                console.log(error);
                setFilteredRegistrations([]);
            })
            .finally(() => {
                setIsFiltered(true);
            });
    };


    return <div className="homepage">
        <h2>Your books</h2>
        <AdvancedFilters filterBooks={searchBooks} orderBy={orderBy} filters={filters} setIsFiltered={setIsFiltered}/>
        <button onClick={removeFilters}>Display all books</button>

        <div className="registrations">
            {
                isFiltered ? 
                    <>{filteredRegistrations?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}</>
                    :
                    <>{myBooks?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}</>
            }
        </div>
    </div>;
};

export default Registrations;
