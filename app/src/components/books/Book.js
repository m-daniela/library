import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { actions } from '../../reducers/bookReducer';
import { detailsRoute } from '../../utils/constants';
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
                console.log(error);
                // setMessage(error);
            });
    };

    return <div className="card">
        <img src={book.cover} alt="img" />
        <div className='details'>
            <h2>{book.title}</h2>
            <div className='tags'>{book.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}</div>
            <div className='description'>{book.description}</div>
            <p>In stock: {book.stock}</p>
            {message.length !== 0 && <span>{message}</span>}
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            {book.stock > 0 && <button onClick={checkin}>Checkin</button>}

        </div>
        
    </div>;
};

export default Book;
