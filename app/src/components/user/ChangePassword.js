import React, {useState} from 'react';

const ChangePassword = () => {
    const [oldPassword, setoldPassword] = useState("");
    const [password, setPassword] = useState("");

    const changePasswordHandler = (e) => {
        e.preventDefault();
    };


    return <div className="homepage">
        <form onSubmit={changePasswordHandler} className="login">
            <h2>Change password</h2>
            <label htmlFor="old-password" >Old password</label>
            <input type="password" id="old-password" onChange={e => setoldPassword(e.target.value)} value={oldPassword} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
            <button type="submit">Change it</button>
        </form>
    </div>;
};

export default ChangePassword;