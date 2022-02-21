import React, { useState } from 'react';
import { registerUser } from '../../utils/serverCalls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


/**
 * User registration form
 * @returns 
 */
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(email, password, admin)
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                setMessage(error.detail);
            });
    };


    return <Form onSubmit={handleRegister}>
        <h2>Register a new user</h2>
        <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />

            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />

            <Form.Check className='my-3 justify-content-center' type="checkbox" id="role" onClick={e => setAdmin(e.target.checked)} defaultChecked={admin} label="Administrator"/>

            <Form.Text>{message}</Form.Text>
            <Button type="submit">Register user</Button>
        </Form.Group>
    </Form>;
};

export default Register;
