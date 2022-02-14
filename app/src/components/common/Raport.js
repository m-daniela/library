import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { getUserRaport } from '../../utils/serverCalls';
import Registration from './Registration';

const Raport = () => {
    const {user} = useContext(UserContext);
    const [raport, setRaport] = useState([]);

    useEffect(() => {
        getUserRaport(user.email)
            .then(data => {
                setRaport(data);
            })
            .catch(data => {
                console.log(data);
                setRaport([]);
            });
    }, []);
    

    return (
        <div className='homepage'>
            <h2>Registrations</h2>
            <span>Your registrations in the past week</span>
            <div className="all-books raport">
                {raport?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}
            </div>
        </div>
    );
};

export default Raport;