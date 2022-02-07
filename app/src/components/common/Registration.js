import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { checkoutBook } from '../../utils/serverCalls';

const Registration = ({registrationInfo}) => {
    const {user} = useContext(UserContext);
    const book = registrationInfo.Book;
    const registration = registrationInfo.Registration;
    // const [book, registration] = registrationInfo;


    const checkout = () => {
        checkoutBook(user.email, book.id)
            .then(data => {
                console.log(data);
            })
            .catch(console.log);
    };
    
    return <div className="book">
        <h2>{book.title}</h2>
        <div>{book.description}</div>
        <p>Checked in at: {registration.checkin}</p>
        {
            registration.checkout ?
                <p>Checked out at: {registration.checkout}</p>
                :
                <button onClick={checkout}>Checkout</button>

        }
    </div>;
};

export default Registration;
