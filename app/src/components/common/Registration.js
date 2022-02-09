import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { convertDate } from '../../utils/constants';
import { checkoutBook } from '../../utils/serverCalls';

const Registration = ({registration}) => {
    const {user} = useContext(UserContext);
    const book = registration.book;

    const checkout = () => {
        checkoutBook(user.email, book.id)
            .then(data => {
                console.log(data);
            })
            .catch(console.log);
    };
    
    return <div className="card">
        <h2>{book.title}</h2>
        <div>{book.description}</div>
        <p>Checked in at: {convertDate(registration.checkin)}</p>
        {
            registration.checkout ?
                <p>Checked out at: {convertDate(registration.checkout)}</p>
                :
                <button onClick={checkout}>Checkout</button>
        }
    </div>;
};

export default Registration;
