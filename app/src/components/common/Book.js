import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { checkinBook } from '../../utils/serverCalls';

const Book = ({book}) => {
    const {user} = useContext(UserContext);

    const checkin = () => {
        checkinBook(user.email, book.id)
            .then(data => {
                console.log(data);
            })
            .catch(console.log);
    };

    return <div className="card">
        <h2>{book.title}</h2>
        <div>{book.description}</div>
        <p>In stock: {book.stock}</p>
        <button onClick={checkin}>Checkin</button>
    </div>;
};

export default Book;
