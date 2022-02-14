import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

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


    return <div className="homepage">
        <form onSubmit={loginHandler} className="login">
            <h2>Login</h2>
            <label htmlFor="email" >Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
            <span>{message}</span>
            <button type="submit">Login</button>
        </form>
    </div>;
};

export default Login;
