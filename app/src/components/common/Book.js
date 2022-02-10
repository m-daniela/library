import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { checkinBook } from '../../utils/serverCalls';

/**
 * Book
 * Display a book and handle checkin
 * @param {*} param0 
 * @returns 
 */
const Book = ({book}) => {
    const {user} = useContext(UserContext);
    const [message, setMessage] = useState("");

    const checkin = () => {
        checkinBook(user.email, book.id)
            .then(data => {
                console.log(data);
                setMessage(data.message);
            })
            .catch(error => {
                setMessage(error.detail);
            });
    };

    return <div className="card">
        <h2>{book.title}</h2>
        <div>{book.description}</div>
        <p>In stock: {book.stock}</p>
        <p>{message}</p>
        <button onClick={checkin}>Checkin</button>
    </div>;
};

export default Book;
