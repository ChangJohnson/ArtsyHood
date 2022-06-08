import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateProfile from './UpdateProfile';
import { useState } from 'react';
import { ImProfile } from 'react-icons/im';

const UserProfile = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        {isAuthenticated ? (
          <IconUpdateProfile onClick={() => navigate('/updateProfile')}>
            <div>Edit Your Profile</div>
            <ImProfile />
          </IconUpdateProfile>
        ) : (
          navigate('/please-signin')
        )}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  height: 80vh;
  max-width: 100%;
`;

const IconUpdateProfile = styled.div`
  margin-top: 45px;
  margin-left: 45px;
  padding-top: 8px;
  font-size: 25px;
  border: none;
  color: black;
  background-color: transparent;
  width: fit-content;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

export default UserProfile;
