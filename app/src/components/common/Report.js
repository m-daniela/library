import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { getUserReport } from '../../utils/serverCalls';
import Registration from './Registration';

/**
 * Display the books the current user 
 * has borrowed in the past week
 * @returns 
 */
const Report = () => {
    const {user} = useContext(UserContext);
    const [report, setReport] = useState([]);

    useEffect(() => {
        getUserReport(user.email)
            .then(data => {
                if (data?.length){
                    setReport(data);
                    setReport([]);
                }
            })
            .catch(error => {
                console.log(error);
                setReport([]);
            });
    }, []);
    

    return (
        <div className='homepage'>
            <h2>Registrations</h2>
            <span>Your registrations in the past week</span>
            <div className="all-books report">
                {report?.map(registration => <Registration key={registration.book_id} registration={registration}/>)}
            </div>
        </div>
    );
};

export default Report;