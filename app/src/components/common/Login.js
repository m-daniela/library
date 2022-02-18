import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


/**
 * Login form
 * @returns 
 */
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useContext(UserContext);

    const loginHandler = (e) => {
        e.preventDefault();
        login(email, password)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                setMessage(error);
            });
    };


    return <Form onSubmit={loginHandler} className="login">
        <h2>Login</h2>
        <Form.Label htmlFor="email" >Email</Form.Label>
        <Form.Control type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
        <span>{message}</span>
        <Button type="submit">Login</Button>
    </Form>;
};

export default Login;
