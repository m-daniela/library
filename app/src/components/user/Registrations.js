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
    const filters = ["checkin", "checkout", "title"];

    const searchBooks = (query, sort, order) => {
        getFilteredRegistrations(user.email, query, sort, order)
            .then(data => {
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
            });
    };



    return <div className="homepage">
        <h2>Your books</h2>
        <AdvancedFilters filterBooks={searchBooks} filters={filters} />
        <div className="registrations">
            {
                filteredRegistrations.length === 0 ? 
                    <>{myBooks?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}</>
                    :
                    <>{filteredRegistrations?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}</>
            }
        </div>
    </div>;
};

export default Registrations;
