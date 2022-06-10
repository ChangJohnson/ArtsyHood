import { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from './AskToSignin';

const Comments = ({ artInfo }) => {
  const [comment, setComment] = useState();
  const { isAuthenticated, user } = useAuth0();

  const handleComment = (e) => {
    e.preventDefault();
    fetch('/api/post-comment', {
      body: JSON.stringify({
        _id: artInfo._id,
        user: user.sub,
        comment: comment,
        picture: user.picture,
        nickname: user.nickname,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <form
          onSubmit={(e) => {
            handleComment(e);
          }}
        >
          <textarea
            placeholder='Write a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type='submit'>Submit comment</button>
        </form>
      ) : (
        <AskToSignin />
      )}
    </div>
  );
};

export default Comments;
