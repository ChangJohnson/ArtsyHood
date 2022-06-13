import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateProfile from './UpdateProfile';
import { useState, useEffect, useContext } from 'react';
import { ImProfile } from 'react-icons/im';
import { AiFillHeart } from 'react-icons/ai';
import { SiArtstation } from 'react-icons/si';
import { BiCommentDetail } from 'react-icons/bi';
import { GiShadowFollower } from 'react-icons/gi';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import LoadingSpinner from '../LoadingSpinner';
import Comments from '../Comments';

const UserProfile = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  let { _id } = useParams();
  const { setUserData, allLikes, artWorkDetails, handleLikes } =
    useContext(GlobalContext);
  const [followingData, getFollowingData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [allFollowingsArts, setAllFollowingsArts] = useState([]);
  const [comments, setComments] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profile/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        'error';
      });
  }, [_id]);

  useEffect(() => {
    fetch(`/api/get-followings-artworks/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data.data);
          setAllFollowingsArts(data.data);
        } else console.log(data.message);
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, [_id]);

  // useEffect(() => {
  //   setLoading2(false);
  //   fetch(`/api/get-followers/${user.sub}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         getFollowersData(data.data);
  //         setLoading2(true);
  //       }
  //     })
  //     .catch((err) => {
  //       'error';
  //     });
  // }, [allFollowings]);

  // useEffect(() => {
  //   setLoading1(false);
  //   fetch(`/api/get-followings/${user.sub}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         getFollowingData(data.data);
  //         setLoading1(true);
  //       }
  //     })
  //     .catch((err) => {
  //       'error';
  //     });
  // }, [user]);

  return (
    <>
      {loading ? (
        <LoadingSpinner top={40} />
      ) : (
        <Wrapper>
          {isAuthenticated ? (
            <Div0>
              <Div>
                <IconUpdateProfile onClick={() => navigate('/updateProfile')}>
                  <div>Edit Your Profile Here:</div>
                  <ImProfile />
                </IconUpdateProfile>
                <CheckUpArt onClick={() => navigate(`/artistArts/${user.sub}`)}>
                  <div>Your Arts:</div>
                  <SiArtstation />
                </CheckUpArt>
                <CheckUpArt onClick={() => navigate(`/followers/${user.sub}`)}>
                  <div>Your Followers:</div>
                  <GiShadowFollower />
                </CheckUpArt>
              </Div>

              <Div1>
                {allFollowingsArts?.map((followingArt) => {
                  return (
                    <div key={followingArt._id}>
                      <Avatar
                        onClick={() =>
                          navigate(`/artistArts/${followingArt.sub}`)
                        }
                        src={followingArt.artistPicture}
                      ></Avatar>
                      <div>
                        @{followingArt.nickname && followingArt.nickname}
                      </div>
                      <div>
                        style:{followingArt.style && followingArt.style}
                      </div>
                      <Img
                        onClick={() => {
                          navigate(
                            `/art/${followingArt.name}/${followingArt.sub}`
                          );
                        }}
                        src={followingArt.url && followingArt.url}
                      ></Img>

                      <div>
                        comments:
                        {followingArt.comments &&
                        followingArt.comments.length > 0
                          ? followingArt.comments.length
                          : 0}
                      </div>
                      <Icons>
                        {comments ? (
                          <span>
                            <BiCommentDetail
                              onClick={() => setComments(!comments)}
                            />
                            <Comments artInfo={followingArt._id} />
                          </span>
                        ) : (
                          <BiCommentDetail
                            onClick={() => setComments(!comments)}
                          />
                        )}
                      </Icons>
                      <Icons onClick={() => handleLikes(artWorkDetails._id)}>
                        <span>
                          {allLikes?.length > 0 ? (
                            <>
                              {allLikes?.some((like) => {
                                return like === artWorkDetails._id;
                              }) ? (
                                <AiFillHeart fill={'rgb(224, 36, 94)'} />
                              ) : (
                                <AiFillHeart fill={'black'} />
                              )}
                            </>
                          ) : (
                            <AiFillHeart fill={'black'} />
                          )}
                        </span>
                      </Icons>

                      <div>
                        @{followingArt.nickname && followingArt.nickname}
                      </div>
                    </div>
                  );
                })}
              </Div1>
            </Div0>
          ) : (
            navigate('/please-signin')
          )}
        </Wrapper>
      )}
    </>
  );
};

const Div0 = styled.div`
  display: flex;
  /* position: relative; */
`;

const Div = styled.div``;

const Div1 = styled.div`
  /* position: absolute; */

  left: 50%;
`;

const Icons = styled.span`
  margin-left: 15px;
  font-size: 25px;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

const Img = styled.img`
  max-height: 600px;
  width: 75%;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

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
  margin-bottom: 150px;
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
