import React from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { createUser, login } from '../helpers';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleRegister = async (event: any) => {
    event.preventDefault();
    
    createUser({ username, password })
      .then(({ username, password }) => {
        login({ username, password });
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>Register Page</h1>

      <LoginForm onSubmit={handleRegister}>
        {error && <Alert severity="error">{error}</Alert>}
        
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <Button type="submit" variant="contained">Login</Button>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
`;

export default RegisterPage;