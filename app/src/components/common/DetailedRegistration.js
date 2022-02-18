import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate, detailsRoute } from '../../utils/constants';

const DetailedRegistration = ({registration, handleDelete}) => {
    const book = registration.book;

    return <div className="card">
        <img src={book?.cover} alt="img" />
        <div className='details'>
            <h2>{book?.title}</h2>
            <div className='tags'>{book?.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}</div>

            <div className='description'>{book?.description}</div>
            <Link to={detailsRoute(book.id)} state={{book}}>Show more details</Link>
            <p>Checked in at: {convertDate(registration.checkin)}</p>
            
            {
                registration.checkout &&
                    <p>Checked out at: {convertDate(registration.checkout)}</p>
            }

            <button onClick={() => handleDelete(book.id)}>Delete registration</button>

        </div>
    </div>;
};

export default DetailedRegistration;