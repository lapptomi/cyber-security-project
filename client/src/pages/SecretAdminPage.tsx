/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import useGetLoggedUser from '../hooks/useGetLoggedUser';
import { getToken } from '../helpers';

function SecretAdminPage() {
  const [secretData, setSecretData] = useState('');
  const { user: loggedUser, loading } = useGetLoggedUser();

  /*
    VULNERABILITY: Broken access control

    In this component we have security vulnerbility,
    since we are not checking if the user is admin or not,
    or if the user is logged in or not.

    We can fix this by redirecting the user to the home page
    if not logged in or not admin like this:

    if (!loggedUser || loggedUser.role !== 'ADMIN') {
      return <Navigate to="/" />;
    }
  */

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/admin`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => {
        setSecretData(response.data.secretData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <h1>Top secret admin view</h1>

      <div>
        <Typography variant="caption" color="textSecondary">
          {`Secret data: ${secretData}`}
        </Typography>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export default SecretAdminPage;
