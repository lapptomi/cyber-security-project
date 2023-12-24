/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { LinearProgress, Typography } from '@mui/material';
import useGetAllUsers from '../hooks/useGetAllUsers';
import useGetLoggedUser from '../hooks/useGetLoggedUser';
import { User } from '../types';

function SecretAdminPage() {
  const { users, loading } = useGetAllUsers();
  const { user: loggedUser, loading: userLoading } = useGetLoggedUser();

  if (loading || userLoading) {
    return <LinearProgress />;
  }

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

  return (
    <Container>
      <h1>Top secret admin view</h1>

      <div>
        <h3>List of users</h3>
        {users.map((user: User) => (
          <StyledRow key={user.id}>
            <Typography variant="body1">
              {`Username: ${user.username}`}
            </Typography>
            <Typography variant="body1">
              {`Password: ${user.password}`}
            </Typography>
          </StyledRow>
        ))}
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

const StyledRow = styled.div`
  padding: 10px;
`;

export default SecretAdminPage;
