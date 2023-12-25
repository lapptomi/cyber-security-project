import {
  Alert, Button, Divider, List, ListItem, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { REACT_APP_API_URL } from '../constants';
import { Comment } from '../types';

const HomePage = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSubmit = async () => {
    axios.post(`${REACT_APP_API_URL}/comments`, { comment })
      .then((response) => {
        setComments([...comments, response.data]);
        setComment('');
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    axios.delete(`${REACT_APP_API_URL}/comments`)
      .then(() => setComments([]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <h1>Home page</h1>

      <Alert severity="info">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption" fontWeight="bold">
            If you want to test XSS vulnerability, you can comment the following line:
          </Typography>
          <Typography fontStyle="italic" variant="caption">
            {"<img onError=alert('Hacked.') src='invalid.url.com'>"}
          </Typography>
          <Typography variant="caption" fontWeight="bold">
            This will trigger a window alert for all the users when the text is rendered,
            but you could also do something more malicious.
          </Typography>
        </div>
      </Alert>

      <div>
        <Typography variant="h6">Leave a comment</Typography>
        <CommentForm>
          <TextField
            fullWidth
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </CommentForm>
      </div>

      <div>
        <Typography variant="h6">Comments</Typography>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Clear all comments
        </Button>

        <List>
          {comments.map((comment) => (
            <div key={comment.id}>
              <ListItem>
                {/*
                  VULNERABILITY: Cross-site scripting (XSS):

                  Here we have an element that is vulnerable to XSS attacks,
                  since we are using the "dangerouslySetInnerHTML" property.

                  We can fix this by simply rendering the comment like this:
                    <div>{comment.comment}</div>
                  insead of:
                    <div dangerouslySetInnerHTML={{ __html: comment.comment }} />

                  Then the comment would be rendered as plain text,
                  so event if the comment value is:
                    <img onError=alert('Hacked.') src='invalid.url.com'>

                  It will not trigger the alert.

                  But have fix for this in the backend (POST api/comments endpoint),
                  so we can leave this as it is.
                */}
                <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const CommentForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
`;

export default HomePage;
