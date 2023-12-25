import React, { useState } from 'react';
import {
  Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { login } from '../helpers';
import { Credentials } from '../types';
import { REACT_APP_API_URL } from '../constants';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState('');

  const handleRegister = async (event: any) => {
    event.preventDefault();

    axios.post(`${REACT_APP_API_URL}/users`, { username, password, role })
      .then(({ data }: AxiosResponse<Credentials>) => {
        login({ username: data.username, password });
      })
      .catch((error) => {
        setError(error.response.data.error);
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>Register Page</h1>

      <RegisterForm onSubmit={handleRegister}>
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
        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label="Role"
            onChange={(event) => setRole(event.target.value)}
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">Login</Button>
      </RegisterForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
`;

export default RegisterPage;
