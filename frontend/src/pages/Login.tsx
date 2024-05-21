import React, { useState } from 'react';
import styled from 'styled-components';
import { login } from '../services/api';

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  padding: 20px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  text-align: center;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  line-height: 0px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #66afe9;
    outline: none;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  color: white;
  cursor: pointer;
  background-color: #50d8d7;
  background-image: linear-gradient(316deg, #50d8d7 0%, #923993 74%);
  transition: all 0.5s ease;

  &:hover {
    background-image: linear-gradient(90deg, #50d8d7 0%, #923993 74%);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  text-align: center;
`;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      onLogin();
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleLogin}>
        <H1>Login</H1>
        <InputsContainer>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputsContainer>
        <Button type='submit'>Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
