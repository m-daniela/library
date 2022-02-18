import React, {useContext, useState} from 'react';
import { UserContext } from '../../context/UserContext';
import { changePassword } from '../../utils/serverCalls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Change the password of the current user
 * @returns 
 */
const ChangePassword = () => {
    const [oldPassword, setoldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {user, updateToken } = useContext(UserContext);

    const changePasswordHandler = (e) => {
        e.preventDefault();
        changePassword(user.email, oldPassword, password)
            .then(data => {
                console.log(data);
                // update the token if successful
                updateToken(data.access_token);
                setMessage(data.message);
            })
            .catch(error => {
                setMessage(error);
            });
    };


    return <Form onSubmit={changePasswordHandler} className="login">
        <h2>Change password</h2>
        <Form.Label htmlFor="old-password" >Old password</Form.Label>
        <Form.Control type="password" id="old-password" onChange={e => setoldPassword(e.target.value)} value={oldPassword} />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
        <span>{message}</span>
        <Button type="submit">Change it</Button>
    </Form>;

};

export default ChangePassword;