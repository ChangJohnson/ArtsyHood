import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import { AiFillHeart } from 'react-icons/ai';
import { RiUserUnfollowLine, RiUserFollowFill } from 'react-icons/ri';
import { User } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from '../AskToSignin';

const AllOfSelectedUserArtWorks = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const { handleLikes, allLikes, allFollowings, handleFollow } =
    useContext(GlobalContext);

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

  return (
    <Wrapper>
      {isAuthenticated ? (
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
                    <span>ArtName:</span>
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
                                <AiFillHeart fill={'black'} />
                              )}
                            </>
                          ) : (
                            <AiFillHeart fill={'black'} />
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
                                <span>CLick to unfollow: </span>
                                <Button
                                  onClick={() => handleFollow(artInfo.sub)}
                                >
                                  <RiUserFollowFill fill={'#2d545e'} />
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <span>Click to Follow: </span>
                                <Button
                                  onClick={() => handleFollow(artInfo.sub)}
                                ></Button>
                              </div>
                            )}{' '}
                          </>
                        ) : (
                          <div>
                            <span>Click to Follow: </span>
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
      ) : (
        <AskToSignin />
      )}
    </Wrapper>
  );
};

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

const HeartIcon = styled.div``;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 1200px;
  margin: auto;

  margin-bottom: 50px;
`;

const Product = styled.div`
  border: 1px solid #cccccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const Img = styled.img`
  width: 150px;
  margin-bottom: 10px;
`;

const StyleAndArtist = styled.span`
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Wrapper = styled.div`
  height: 80vh;
`;

export default AllOfSelectedUserArtWorks;
