import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate, detailsRoute } from '../../utils/constants';
import { Badge, Button, Col, Row } from 'react-bootstrap';



const DetailedRegistration = ({registration, handleDelete}) => {
    const book = registration.book;

    return <Row className="book">
        <Col xs="auto">
            <img src={book?.cover} alt="img" />

        </Col>
        <Col className='details'>
            <h2>{book?.title}</h2>
            <div className='tags'>{book?.tags.map(tag => <Badge key={tag.id} bg="danger">{tag.name}</Badge>)}</div>

            <div className='description'>{book?.description}</div>
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            <p>Checked in at: {convertDate(registration.checkin)}</p>
            
            {
                registration.checkout &&
                    <p>Checked out at: {convertDate(registration.checkout)}</p>
            }

            <Button onClick={() => handleDelete(book.id)}>Delete registration</Button>

        </Col>
    </Row>;
};

export default DetailedRegistration;