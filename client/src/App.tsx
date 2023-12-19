import React from 'react';
import './App.css';
import styled from 'styled-components';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>

    <div className="App">
      <Navigation>
        <StyledLink to="/">Users</StyledLink>
        <StyledLink to="/posts">Posts</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
        <StyledLink to="/register">register</StyledLink>
        <StyledLink to="/login">login</StyledLink>
      </Navigation>

      <Routes>
        <Route path="/" element={<h1>asd</h1>} />
        <Route path="/posts" element={<h1>blog</h1>} />
        <Route path="/users/*" element={<h1>asd</h1>} />
        <Route path="/admin" element={<h1>Secret data here</h1>} />
      </Routes>
    </div>
    </BrowserRouter>

  );
}

const Navigation = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #282c34;
  color: white;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    color: red;
  }
`;

export default App;