import { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from './AskToSignin';

const Comments = ({ artInfo }) => {
  const [comment, setComment] = useState();
  const { isAuthenticated, user } = useAuth0();
  const [commentWithId, setCommentWithId] = useState([]);

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
        if (data.status === 200) {
          console.log(data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const deleteComment = (comment) => {
    fetch('/api/delete-comment', {
      body: JSON.stringify({
        _id: artInfo._id,
        comment,
      }),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log('success', data);
          window.location.reload();
        }
      })
      .catch((err) => {
        'error';
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
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
          <div>
            {artInfo.comments?.map((comment) => {
              return (
                <div key={comment.commentId}>
                  <div>{comment.nickname}</div>
                  <div>{comment.comment}</div>
                  <img src={comment.picture}></img>
                  {comment.authorHandle === user.sub && (
                    <button onClick={() => deleteComment(comment)}>
                      Delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <AskToSignin />
      )}
    </div>
  );
};

export default Comments;
