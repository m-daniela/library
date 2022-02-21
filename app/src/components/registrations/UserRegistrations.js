import React, { useState } from 'react';
import { deleteRegistration, getRegistrations } from '../../utils/serverCalls';
import DetailedRegistration from './DetailedRegistration';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

/**
 * User registrations
 * Display, delete, update registrations for 
 * a given user
 * @returns 
 */
const UserRegistrations = () => {
    const [email, setEmail] = useState("");
    const [registrations, setRegistrations] = useState([]);

    // search for a user
    const handleSearch = (e) => {
        e.preventDefault();
        getRegistrations(email)
            .then(data => {
                console.log(data);
                if (data?.length){
                    setRegistrations(data);
                }
                else{
                    setRegistrations([]);
                }
            })
            .catch(error => {
                console.log(error);
                setRegistrations([]);

            });
    };

    // delete the registration based on the
    // email and book id
    const handleDelete = (bookId) => {
        console.log(bookId, email);
        deleteRegistration(email, bookId)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

    };

    return (
        <div className='homepage'>
            <Form onSubmit={handleSearch}>
                <h2>Search for a user</h2>
                <Row className="align-items-center">
                    <Col className="col-8">
                        <Form.Control id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Search..."/>
                    </Col>
                    <Col className="col-1">
                        <Button type='submit'>Search</Button>
                    </Col>
                </Row>
                

            </Form>
            <div className='selected-registrations'>
                {registrations?.map(registration => <DetailedRegistration key={registration.book_id} registration={registration} handleDelete={handleDelete}/>)}
            </div>

        </div>
    );
};

export default UserRegistrations;