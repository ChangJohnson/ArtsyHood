import { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from './AskToSignin';

const Comments = ({ artInfo }) => {
  const { isAuthenticated, user } = useAuth0();

  const [comment, setComment] = useState();

  console.log('artInfo', artInfo);

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
        console.log(data);

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
    <Wrapper>
      {isAuthenticated ? (
        <>
          <form
            onSubmit={(e) => {
              handleComment(e);
            }}
          >
            <CommentDiv>
              <TextArea
                resize='none'
                cols='40'
                rows='8'
                placeholder='Write a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></TextArea>
              <Button type='submit'>Submit</Button>
            </CommentDiv>
          </form>
          <div>
            {artInfo.comments?.map((comment) => {
              return (
                <div key={Math.floor(Math.random() * 54621874512)}>
                  <CommentDiv1>
                    <Coommenteravatar src={comment.picture}></Coommenteravatar>
                    <CommenterNickname>@{comment.nickname}</CommenterNickname>
                  </CommentDiv1>
                  <CommentDiv2>
                    <Comment>{comment.comment}</Comment>
                    {comment.authorHandle === user.sub && (
                      <DeleteButton onClick={() => deleteComment(comment)}>
                        Delete
                      </DeleteButton>
                    )}
                  </CommentDiv2>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <AskToSignin />
      )}
    </Wrapper>
  );
};

const CommentDiv2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentDiv1 = styled.div`
  display: flex;
  margin-top: 25px;
`;

const CommenterNickname = styled.div`
  color: #808080;
  margin-bottom: 3px;
  margin-top: 15px;
`;

const Comment = styled.div`
  margin-top: 15px;
  border: none;
  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  overflow-y: hidden;
  outline: 0;
  background: white;
  padding: 20px;
  font-size: 1.4em;
  color: #343434;
  min-width: 300px;
  min-height: 25px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: relative;
  background: #fff;
`;

const Coommenteravatar = styled.img`
  margin-bottom: 25px;
  margin-left: 10px;
  margin-right: 20px;
  color: #e0e0e0;
  width: 75px;
  border-radius: 50%;
`;

const DeleteButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #12343b;

  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #2d545e 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fcfcfd;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 12px;
  width: 60px;
  margin-top: 25px;
  margin-left: 25px;
`;

const Wrapper = styled.div`
  margin: 25px;
`;

const TextArea = styled.textarea`
  border: none;

  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  overflow-y: hidden;

  /* optional CSS */
  border: 1px solid #2d545e;
  outline: 0;
  background: white;
  border-radius: 20px;
  padding: 20px;
  font-weight: bold;
  font-size: 1.4em;
  color: #343434;
  min-width: 300px;
  min-height: 80px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  position: relative;
  background: #fff;
`;

const CommentDiv = styled.div`
  display: flex;
`;

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: #12343b;

  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #2d545e 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fcfcfd;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 12px;
  width: 70px;
  margin-top: 50px;
  margin-left: 25px;
`;

export default Comments;
