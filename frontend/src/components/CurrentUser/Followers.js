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
              <Wrapper>
                <FollowerCard>
                  <Div>
                    <Name onClick={() => navigate(`/artistArts/${el._id}`)}>
                      {el.name ? el.name : ''}
                    </Name>
                    <Name onClick={() => navigate(`/artistArts/${el._id}`)}>
                      @{el.nickname ? el.nickname : ''}
                    </Name>
                    <Avatar
                      src={el.picture ? el.picture : ''}
                      onClick={() => navigate(`/artistArts/${el._id}`)}
                    ></Avatar>
                  </Div>
                  <Div2>
                    <div>Location:</div>
                    <div>{el.city ? el.city : ''},</div>
                    <div>{el.province ? el.province : ''},</div>
                    <div>{el.country ? el.country : ''}</div>
                  </Div2>
                </FollowerCard>
              </Wrapper>
            );
          })
        : ''}
    </>
  );
};
const Div2 = styled.div`
  margin-top: 7px;
`;

const Div = styled.div`
  border-bottom: 1px solid #5d6d7e;
`;

const FollowerCard = styled.div`
  border: 1px solid #f2f4f4;
  width: fit-content;
  padding: 10px;
  box-shadow: 10px 5px 5px #abb2b9;
  background-color: #fdfefe;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  margin-left: 25px;
`;

const Name = styled.div`
  margin-top: 5px;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Avatar = styled.img`
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 5px;

  color: #e0e0e0;
  width: 60px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

export default Followers;
