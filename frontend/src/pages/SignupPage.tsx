import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container'; // Import the Container component

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const signupResponse = await axios.post('http://localhost:3000/user', {
        name,
        email,
        password,
      });

      setMessage('Signup successful! Logging in...');

      const loginResponse = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);

      navigate('/ensembles');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      <form
        onSubmit={handleSignup}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default SignupPage;
