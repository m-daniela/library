import React, { useState } from 'react';
import { registerUser } from '../../utils/serverCalls';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [message, setMessage] = useState("");

    const registerHandler = (e) => {
        e.preventDefault();
        registerUser(email, password, admin)
            .then(data => {
                setMessage(data.message);
            })
            .catch(setMessage);
    };


    return <div className="register">
        <h2>Register a new user</h2>
        <form onSubmit={registerHandler}>
            <label htmlFor="email" >Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
            <label htmlFor="role"> <input type="checkbox" id="role" onClick={e => setAdmin(e.target.checked)} defaultChecked={admin}/>Administator</label>
            <p>{message}</p>
            <button type="submit">Add user</button>
        </form>
    </div>;
};

export default Register;
