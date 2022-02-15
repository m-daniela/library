import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { deleteRegistration, getRegistrations } from '../../utils/serverCalls';
import DetailedRegistration from '../common/DetailedRegistration';


/**
 * User registrations
 * Display, delete, update registrations for 
 * a given user
 * @returns 
 */
const UserRegistrations = () => {
    const {user} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [registrations, setRegistrations] = useState([]);

    // search for a user
    const handleSearch = (e) => {
        e.preventDefault();
        getRegistrations(email)
            .then(data => {
                console.log(data);
                if (data?.length){
                    setRegistrations(data);
                }
                else{
                    setRegistrations([]);
                }
            })
            .catch(error => {
                console.log(error);
                setRegistrations([]);

            });
    };

    // delete the registration based on the
    // email and book id
    const handleDelete = (bookId) => {
        console.log(bookId, email);
        deleteRegistration(email, bookId)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);

            });

    };

    return (
        <div className='homepage'>
            <form onSubmit={handleSearch}>
                <label htmlFor='email'>
                    <input id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <button type='submit'>Search</button>
                </label>
            </form>
            <div className='selected-registrations'>
                {registrations?.map(registration => <DetailedRegistration key={registration.book_id} registration={registration} handleDelete={handleDelete}/>)}
            </div>

        </div>
    );
};

export default UserRegistrations;