import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Followers = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [followersData, getFollowersData] = useState();

  useEffect(() => {
    setLoading(false);
    fetch(`/api/followers/${user.sub}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          getFollowersData(data.data);
          setLoading(true);
        }
      })
      .catch((err) => {
        'error';
      });
  }, [user.sub]);

  return (
    <>
      {isAuthenticated
        ? followersData?.map((el) => {
            return (
              <div>
                <div>{el.name ? el.name : ''}</div>
                <div>@{el.nickname ? el.nickname : ''}</div>
                <Avatar
                  src={el.picture ? el.picture : ''}
                  onClick={() => navigate(`/artistArts/${el._id}`)}
                ></Avatar>
                <div>{el.city ? el.city : ''}</div>
                <div>{el.province ? el.province : ''}</div>
                <div>{el.country ? el.country : ''}</div>
              </div>
            );
          })
        : ''}
    </>
  );
};

const Avatar = styled.img`
  margin-left: 10px;
  color: #e0e0e0;
  width: 60px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

export default Followers;
