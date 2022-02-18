import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { UserContext } from '../../context/UserContext';
import { actions } from '../../reducers/bookReducer';
import { convertDate, detailsRoute } from '../../utils/constants';
import { checkoutBook } from '../../utils/serverCalls';
import { Badge, Button, Col, Row } from 'react-bootstrap';


/**
 * Registration
 * Display a registration and handle checkout
 * @param {*} registrationInfo
 * @returns 
 */
const Registration = ({registration}) => {
    const {user} = useContext(UserContext);
    const {dispatch} = useContext(BookContext);
    const [message, setMessage] = useState("");
    const book = registration.book;

    const checkout = () => {
        checkoutBook(user.email, book.id)
            .then(data => {
                setMessage(data.message);
                dispatch({type: actions.checkout, payload: data.data});

            })
            .catch(error => {
                console.log(error);
                setMessage(error.detail);
            });
    };
    
    // return <div className="card">
    //     <img src={book?.cover} alt="img" />
    //     <div className='details'>
    //         <h2>{book?.title}</h2>
    //         <div className='tags'>{book?.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}</div>

    //         <div className='description'>{book?.description}</div>
    //         <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
    //         <p>Checked in at: {convertDate(registration.checkin)}</p>
    //         {message.length !== 0 && <span>{message}</span>}
            
    //         {
    //             registration.checkout ?
    //                 <p>Checked out at: {convertDate(registration.checkout)}</p>
    //                 :
    //                 <button onClick={checkout}>Checkout</button>
    //         }

    //     </div>

    // </div>;

    return <Row className="book">
        <Col xs="auto">
            <img src={book?.cover} alt="img" />
        </Col>
        
        <Col className='details'>
            <h2>{book?.title}</h2>
            <div className='tags'>{book?.tags.map(tag => <Badge key={tag.id}>{tag.name}</Badge>)}</div>

            <div className='description'>{book?.description}</div>
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            <p>Checked in at: {convertDate(registration.checkin)}</p>
            {message.length !== 0 && <span>{message}</span>}
            
            {
                registration.checkout ?
                    <p>Checked out at: {convertDate(registration.checkout)}</p>
                    :
                    <Button onClick={checkout}>Checkout</Button>
            }

        </Col>

    </Row>;
};

export default Registration;
