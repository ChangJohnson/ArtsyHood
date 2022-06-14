import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiUserUnfollowLine, RiUserFollowFill } from 'react-icons/ri';
import { User } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from '../AskToSignin';
import LoadingSpinner from '../LoadingSpinner';

const AllOfSelectedUserArtWorks = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const { handleLikes, allLikes, allFollowings, handleFollow } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [artistData, setArtistData] = useState();
  const [currentUserArts, setCurrentUserArts] = useState([]);

  useEffect(() => {
    fetch(`/api/all-art-work/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCurrentUserArts(data.data);
        } else console.log(data.message);
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtistData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        'error';
      });
  }, [id]);

  return (
    <Wrapper>
      {isAuthenticated ? (
        <Container>
          <div>
            {loading ? (
              <LoadingSpinner top={40} />
            ) : (
              <ArtistDiv>
                <div>
                  <Avatar
                    src={artistData.picture ? artistData.picture : ''}
                  ></Avatar>
                  <Div>
                    @
                    {artistData.nickname
                      ? artistData.nickname
                      : 'artistData.nickname'}
                  </Div>
                </div>
                <Span>Artist Name:</Span>
                <Span>{artistData.name ? artistData.name : ''}</Span>
              </ArtistDiv>
            )}
          </div>
          <Products>
            {currentUserArts.map((artInfo) => {
              return (
                <div key={artInfo._id}>
                  <Product>
                    <ImageContainer
                      onClick={() => {
                        navigate(`/art/${artInfo.name}/${artInfo.sub}`);
                      }}
                    >
                      <Img src={artInfo.url}></Img>
                    </ImageContainer>
                    <div>
                      <ArtName
                        onClick={() => {
                          navigate(`/art/${artInfo.name}/${artInfo.sub}`);
                        }}
                      >
                        {artInfo.name}
                      </ArtName>
                    </div>
                    <div>
                      {' '}
                      <span>Style:</span>
                      <StyleAndArtist
                        onClick={() => navigate(`/style/${artInfo.style}`)}
                      >
                        {artInfo.style}
                      </StyleAndArtist>
                    </div>

                    <div>
                      <span>Comments:</span>
                      <span>
                        {artInfo.comments ? artInfo.comments.length : 0}
                      </span>
                    </div>
                    {user.sub === artInfo.sub ? (
                      ''
                    ) : (
                      <>
                        <div onClick={() => handleLikes(artInfo._id)}>
                          <Title>Like:</Title>
                          <Name>
                            {allLikes?.length > 0 ? (
                              <>
                                {allLikes?.some((like) => {
                                  return like === artInfo._id;
                                }) ? (
                                  <AiFillHeart fill={'rgb(224, 36, 94)'} />
                                ) : (
                                  <AiOutlineHeart />
                                )}
                              </>
                            ) : (
                              <AiOutlineHeart />
                            )}
                          </Name>
                        </div>

                        <div>
                          {allFollowings?.length > 0 ? (
                            <>
                              {allFollowings?.some((following) => {
                                console.log('following', following);
                                return following === artInfo.sub;
                              }) ? (
                                <div>
                                  <span>Following: </span>
                                  <Button
                                    onClick={() => handleFollow(artInfo.sub)}
                                  >
                                    <RiUserFollowFill fill={'#2d545e'} />
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <span>Unfollow: </span>
                                  <Button
                                    onClick={() => handleFollow(artInfo.sub)}
                                  ></Button>
                                </div>
                              )}{' '}
                            </>
                          ) : (
                            <div>
                              <span>Unfollow: </span>
                              <Button onClick={() => handleFollow(artInfo.sub)}>
                                <RiUserUnfollowLine color={'black'} />
                              </Button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </Product>
                </div>
              );
            })}
          </Products>
        </Container>
      ) : (
        <AskToSignin />
      )}
    </Wrapper>
  );
};

const Div = styled.div`
  margin-top: 25px;
  margin-left: 45px;
  padding-top: 8px;
  font-size: 25px;
  border: none;
  color: black;
  background-color: transparent;
  width: fit-content;
  margin-bottom: 25px;
  margin-left: 10px;
`;

const Span = styled.span`
  margin-top: 25px;
  margin-left: 45px;
  padding-top: 8px;
  font-size: 25px;
  border: none;
  color: black;
  background-color: transparent;
  width: fit-content;
  margin-bottom: 25px;
  margin-left: 10px;
`;

const ArtistDiv = styled.div`
  margin-top: 25px;
  margin-left: 25px;
`;

const Container = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-bottom: 15px;
  margin-left: 10px;
  color: #e0e0e0;
  width: 80px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  width: 45px;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Title = styled.span``;

const Name = styled.span`
  margin-left: 5px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 250px;
  min-height: 100%;
`;

const Product = styled.div`
  border: 1px solid #cccccc;
  margin: 10px;
  padding: 25px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: black;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

const ArtName = styled.span`
  margin-left: 5px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const Img = styled.img`
  width: 180px;
  height: 190px;
  margin-bottom: 10px;
  border-radius: 1%;
  object-fit: cover;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const StyleAndArtist = styled.span`
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  margin-bottom: 150px;
  background-color: var(--color-Sand-Tan);
`;

export default AllOfSelectedUserArtWorks;
