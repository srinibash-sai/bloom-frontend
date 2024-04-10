import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginComp = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = {
      email: email,
      password: pass
    }
    axios.post('http://127.0.0.1:8000/api/login', formData)
      .then(result => {
        console.log(result.data);
        navigate('/home')
        const token = result.data.token;
        localStorage.setItem('jwtToken', token);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here.
      </button>
    </div>
  )
}