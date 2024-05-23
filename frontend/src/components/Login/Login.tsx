import React, { useState } from 'react';
import { login } from '../../services/api';
import { Loader } from '../Loader';
import {
  LoginContainer,
  Form,
  H1,
  InputsContainer,
  Input,
  Button,
  ErrorMessage,
} from './Login.styles';
import { LoginProps } from './Login.types';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  // Handle login process
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      onLogin(); // Callback to parent component
    } catch (error) {
      setError('Email o contraseña incorrecta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleLogin}>
        <H1>LOGIN</H1>
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
        {!isloading ? (
          <Button type='submit'>Login</Button>
        ) : (
          <div
            style={{
              margin: 'auto',
            }}
          >
            <Loader />
          </div>
        )}
      </Form>
    </LoginContainer>
  );
};

export default Login;
