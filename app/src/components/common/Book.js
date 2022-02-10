import React, { useContext, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { actions } from '../../reducers/bookReducer';
import { checkinBook } from '../../utils/serverCalls';

/**
 * Book
 * Display a book and handle checkin
 * @param {*} param0 
 * @returns 
 */
const Book = ({book}) => {
    const {user} = useContext(UserContext);
    const {dispatch} = useContext(BookContext);
    const [message, setMessage] = useState("");

    const checkin = () => {
        checkinBook(user.email, book.id)
            .then(data => {
                setMessage(data.message);
                if (data.data !== null){
                    // prepare the payload 
                    const {registration, book } = data.data;
                    const payload = {
                        ...registration, 
                        book: book
                    };
                    dispatch({type: actions.checkin, payload});
                }
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
