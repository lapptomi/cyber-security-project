import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SecretAdminPage from "./pages/SecretAdminPage";
import styled from "styled-components";
import useGetLoggedUser from "./hooks/useGetLoggedUser";
import { Button, LinearProgress } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import { logout } from './helpers';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const { user, loading } = useGetLoggedUser();

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <BrowserRouter>
      <Navigation>
        <NavigationItems>
          <Link to="/">
            <Button size="small">Home</Button>
          </Link>
          {user && (
            <Link to="/admin">
              <Button variant="contained" size="small">Admin Page</Button>
            </Link>
          )}
        </NavigationItems>

        {user 
          ? (
            <Button size="small" variant="contained" onClick={logout}>
              logout
            </Button>
          )
          : (
            <NavigationItems>
              <Link to="/login">
                <Button size="small">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" size="small">Sign up</Button>
              </Link>
            </NavigationItems>
          )
        }
        
      </Navigation>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<SecretAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const Navigation = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #282c34;
  color: white;
  justify-content: space-between;
`;

const NavigationItems = styled.div`
  display: flex;
  gap: 20px;
`;

export default App;