import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/ContextProvider';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const loginHandler = (e) => {
    e.preventDefault();
    login(email, password);
  }


  return <div className='login'>
    <form onSubmit={loginHandler}>
      <label htmlFor="email" >Email</label>
      <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
      <button type="submit">Login</button>
    </form>
  </div>;
};

export default Login;
