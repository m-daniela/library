import React, { useContext, useState } from 'react';
import { deleteRegistration, getRegistrations } from '../../utils/serverCalls';
import DetailedRegistration from './DetailedRegistration';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import {UserContext} from "../../context/UserContext";
import {BookContext} from "../../context/BookContext";
import { bookActions } from '../../reducers/bookReducer';
import ToastMessage from '../common/ToastMessage';

/**
 * User registrations
 * Display, delete, update registrations for 
 * a given user
 * @returns 
 */
const UserRegistrations = () => {
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const {user} = useContext(UserContext);
    const {dispatch} = useContext(BookContext);

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
                // if the registration that was deleted was the 
                // current user's, reload the list of registrations
                if (email === user.email){
                    dispatch({type: bookActions.loadData});
                }
                setShow(data.message);

            })
            .catch(error => {
                console.log(error);
            });

    };

    return (
        <div className='homepage'>
            {
                show && <ToastMessage header="Deleted an entry" body="show"/>
            }
            <Form onSubmit={handleSearch}>
                <h2>Search for a user</h2>
                <Row className="align-items-center">
                    <Col className="col-9 px-0">
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