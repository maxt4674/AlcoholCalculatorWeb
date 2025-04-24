import React, { useState } from 'react';
import { useAuth } from '../components/Authentication/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });

      const token = res.data.token;

      login(token);

      navigate('/');

    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <br />
      <p>No account? click below</p>
      <a href="/register">Register Here</a>
      <p>Don't want to login?</p>
      <a href="/">Home</a>
    </div>
  );
};

export default Login;