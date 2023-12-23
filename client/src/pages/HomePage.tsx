import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const comments = [
    'random comment 1',
    'random comment 2',
    // Triggers window alert when this text is rendered.
    "<img onError=alert('Hacked.') src='invalid.url.com'>",
  ];

  return (
    <Container>
      <h1>Home page</h1>
      {comments.map((comment) => (
        <div key={comment} dangerouslySetInnerHTML={{ __html: comment }} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export default HomePage;
