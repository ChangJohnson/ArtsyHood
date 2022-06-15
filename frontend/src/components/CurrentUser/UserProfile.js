import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateProfile from './UpdateProfile';
import { useState, useEffect, useContext } from 'react';
import { ImProfile } from 'react-icons/im';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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

  const { userData, setUserData, allLikes, handleLikes } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
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
          setAllFollowingsArts(data.data);
        } else console.log(data.message);
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, [_id]);

  console.log('following', allFollowingsArts);

  return (
    <>
      {loading ? (
        <LoadingSpinner top={40} />
      ) : (
        <Wrapper>
          {isAuthenticated ? (
            <Div0>
              <Div>
                <Div7>
                  {userData.picture ? (
                    <Avatar src={userData.picture}></Avatar>
                  ) : (
                    ''
                  )}
                  <div>
                    {userData.nickname ? <div>@{userData.nickname}</div> : ''}
                  </div>
                </Div7>
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
                    <FollowingsDiv key={followingArt._id}>
                      <Div3>
                        <Div2>
                          <Avatar
                            onClick={() =>
                              navigate(`/artistArts/${followingArt.sub}`)
                            }
                            src={followingArt.artistPicture}
                          ></Avatar>
                          <div>
                            <Nickname
                              onClick={() =>
                                navigate(`/artistArts/${followingArt.sub}`)
                              }
                            >
                              @{followingArt.nickname && followingArt.nickname}
                            </Nickname>
                            <Style
                              onClick={() =>
                                navigate(`/style/${followingArt.style}`)
                              }
                            >
                              <StyleSpan> Style:</StyleSpan>
                              <StyleSpan1>
                                {followingArt.style && followingArt.style}
                              </StyleSpan1>
                            </Style>
                          </div>
                        </Div2>
                        <Img
                          onClick={() => {
                            navigate(
                              `/art/${followingArt.name}/${followingArt.sub}`
                            );
                          }}
                          src={followingArt.url && followingArt.url}
                        ></Img>

                        <ArtName
                          onClick={() => {
                            navigate(
                              `/art/${followingArt.name}/${followingArt.sub}`
                            );
                          }}
                        >
                          {followingArt.name && followingArt.name}
                        </ArtName>
                        <Div4>
                          <Icons>
                            {comments ? (
                              <>
                                <Div5>
                                  <CommentsIcon>
                                    <BiCommentDetail
                                      onClick={() => setComments(!comments)}
                                    />
                                  </CommentsIcon>
                                  <CommentsSpan>
                                    {' '}
                                    {followingArt.comments &&
                                    followingArt.comments.length > 0
                                      ? followingArt.comments.length
                                      : 0}
                                  </CommentsSpan>
                                </Div5>
                                <>
                                  <Comments artInfo={followingArt._id} />
                                </>
                              </>
                            ) : (
                              <>
                                <Div5>
                                  <CommentsIcon>
                                    <BiCommentDetail
                                      onClick={() => setComments(!comments)}
                                    />
                                  </CommentsIcon>
                                  <CommentsSpan>
                                    {' '}
                                    {followingArt.comments &&
                                    followingArt.comments.length > 0
                                      ? followingArt.comments.length
                                      : 0}
                                  </CommentsSpan>
                                </Div5>
                              </>
                            )}
                          </Icons>
                          <Icons onClick={() => handleLikes(followingArt._id)}>
                            <span>
                              {allLikes?.length > 0 ? (
                                <>
                                  {allLikes?.some((like) => {
                                    return like === followingArt._id;
                                  }) ? (
                                    <Div5>
                                      <IconSpan>
                                        <AiFillHeart
                                          fill={'rgb(224, 36, 94)'}
                                        />
                                      </IconSpan>
                                      <LikesSpan>
                                        {followingArt.numOfLikes &&
                                        followingArt.numOfLikes.length > 0
                                          ? followingArt.numOfLikes.length
                                          : 0}
                                      </LikesSpan>
                                    </Div5>
                                  ) : (
                                    <Div5>
                                      <IconSpan>
                                        <AiOutlineHeart />
                                      </IconSpan>
                                      <LikesSpan>
                                        {followingArt.numOfLikes &&
                                        followingArt.numOfLikes.length > 0
                                          ? followingArt.numOfLikes.length
                                          : 0}
                                      </LikesSpan>
                                    </Div5>
                                  )}
                                </>
                              ) : (
                                <Div5>
                                  <IconSpan>
                                    <AiOutlineHeart />
                                  </IconSpan>
                                  <LikesSpan>
                                    {followingArt.numOfLikes &&
                                    followingArt.numOfLikes.length > 0
                                      ? followingArt.numOfLikes.length
                                      : 0}
                                  </LikesSpan>
                                </Div5>
                              )}
                            </span>
                          </Icons>
                        </Div4>
                      </Div3>
                    </FollowingsDiv>
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

const StyleSpan1 = styled.span`
  font-weight: bold;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const ArtName = styled.div`
  margin-top: 10px;
  margin-left: 25px;
  font-size: 22px;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Div7 = styled.div`
  margin-left: 40px;
`;

const CommentsSpan = styled.span`
  padding-bottom: 5px;
  margin-left: 10px;
  padding-top: 5px;
  font-size: 15px;
`;

const CommentsIcon = styled.span`
  font-size: 35px;
`;

const Div5 = styled.span`
  display: flex;
`;

const IconSpan = styled.span`
  font-size: 35px;
`;

const LikesSpan = styled.span`
  margin-left: 10px;
  padding-top: 5px;
`;

const Div4 = styled.div`
  margin-top: 45px;
  display: flex;
`;

const StyleSpan = styled.span`
  margin-right: 7px;
`;

const Div3 = styled.div`
  margin-left: 100px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const FollowingsDiv = styled.div`
  /* margin-bottom: 75px; */
  border-bottom: 1px solid #d6dbdf;
`;

const Nickname = styled.div`
  color: #808080;
  margin-bottom: 3px;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Style = styled.div`
  margin-top: 10px;
`;

const Div2 = styled.div`
  display: flex;
`;

const Div0 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div1 = styled.div`
  margin-right: 20%;
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #d6dbdf;
  border-left: 1px solid #d6dbdf;
  border-right: 1px solid #d6dbdf;
  width: 1200px;
`;

const Icons = styled.span`
  margin-left: 25px;
  margin-bottom: 50px;

  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

const Img = styled.img`
  max-height: 600px;
  border-radius: 1%;
  width: 85%;
  object-fit: cover;
  box-shadow: 10px 5px 5px #abb2b9;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

const Avatar = styled.img`
  margin-bottom: 25px;
  margin-left: 10px;
  margin-right: 20px;
  color: #e0e0e0;
  width: 75px;
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
  margin-bottom: 250px;
  margin-top: 100px;
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
