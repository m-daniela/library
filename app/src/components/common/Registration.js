import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { convertDate } from '../../utils/constants';
import { checkoutBook } from '../../utils/serverCalls';

/**
 * Registration
 * Display a registration and handle checkout
 * @param {*} registrationInfo
 * @returns 
 */
const Registration = ({registration}) => {
    const {user} = useContext(UserContext);
    const [message, setMessage] = useState("");
    const book = registration.book;

    const checkout = () => {
        checkoutBook(user.email, book.id)
            .then(data => {
                console.log(data);
                setMessage(data.message);
            })
            .catch(error => {
                console.log(error);
                setMessage(error.detail);
            });
    };
    
    return <div className="card">
        <h2>{book?.title}</h2>
        <div>{book?.description}</div>
        <p>Checked in at: {convertDate(registration.checkin)}</p>
        <p>{message}</p>
        {
            registration.checkout ?
                <p>Checked out at: {convertDate(registration.checkout)}</p>
                :
                <button onClick={checkout}>Checkout</button>
        }
    </div>;
};

export default Registration;
