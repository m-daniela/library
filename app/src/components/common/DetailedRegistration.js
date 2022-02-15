import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { convertDate, detailsRoute } from '../../utils/constants';

const DetailedRegistration = ({registration, handleDelete}) => {
    const [message, setMessage] = useState("");
    const book = registration.book;


    return <div className="card">
        <img src={book?.cover} alt="img" />
        <div className='details'>
            <h2>{book?.title}</h2>
            <div className='description'>{book?.description}</div>
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            <p>Checked in at: {convertDate(registration.checkin)}</p>
            {message.length !== 0 && <span>{message}</span>}
            
            {
                registration.checkout &&
                    <p>Checked out at: {convertDate(registration.checkout)}</p>
            }

            <button onClick={() => handleDelete(book.id)}>Delete registration</button>

        </div>
    </div>;
};

export default DetailedRegistration;