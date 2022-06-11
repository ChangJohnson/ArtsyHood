import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateProfile from './UpdateProfile';
import { useState, useEffect } from 'react';
import { ImProfile } from 'react-icons/im';
import { SiArtstation } from 'react-icons/si';
// import { SingleArtWorkDetails } from '../SearchResult/SingleArtWorkDetails';

const UserProfile = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  let { _id } = useParams();

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profile/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        'error';
      });
  }, [_id]);

  const handleFollow = () => {
    console.log('click');

    fetch('/api/follow', {
      body: JSON.stringify({
        _id: userData._id,
        user: user.sub,
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
  };

  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <Wrapper>
          {isAuthenticated ? (
            <>
              <div>
                <IconUpdateProfile onClick={() => navigate('/updateProfile')}>
                  <div>Edit Your Profile Here:</div>
                  <ImProfile />
                </IconUpdateProfile>
                <CheckUpArt onClick={() => navigate(`/artistArts/${user.sub}`)}>
                  <div>Your Arts:</div>
                  <SiArtstation />
                </CheckUpArt>
              </div>
              <div>{userData.name && userData.name}</div>
              <img src={userData.picture}></img>

              <div>{userData.country && userData.country}</div>
              <div>{userData.city && userData.city}</div>
              <div></div>
              {user.sub !== userData._id && (
                <>
                  {follow ? (
                    <button onClick={() => handleFollow()}>Unfollow</button>
                  ) : (
                    <button onClick={() => handleFollow()}>Follow</button>
                  )}
                </>
              )}
            </>
          ) : (
            navigate('/please-signin')
          )}
        </Wrapper>
      )}
    </>
  );
};
const CheckUpArt = styled.div`
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

const Wrapper = styled.div`
  min-height: calc(100vh - 350px);
  /* max-width: 100%; */
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
