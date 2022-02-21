import React, { useContext, useState } from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { bookActions } from '../../reducers/bookReducer';
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
                    dispatch({type: bookActions.checkin, payload});
                }
            })
            .catch(error => {
                console.log(error);
                // setMessage(error);
            });
    };

    return <Row className='book'>
        <Col xs="auto" className='mx-auto'>
            <img src={book.cover} alt="img" />
        </Col>
        <Col className="details">
            <h2>{book.title}</h2>
            <div className='tags'>{book.tags.map(tag => <Badge key={tag.id} bg="danger">{tag.name}</Badge>)}</div>
            <div className='description'>{book.description}</div>
            <span>In stock: {book.stock}</span>
            {message.length !== 0 && <span>{message}</span>}
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            {book.stock > 0 && <Button onClick={checkin}>Checkin</Button>}
        </Col>
    </Row>;
};

export default Book;
