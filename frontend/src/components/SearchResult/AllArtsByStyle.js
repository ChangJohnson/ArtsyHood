import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../LoadingSpinner';
import Comments from '../Comments';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiUserFollowFill, RiUserUnfollowLine } from 'react-icons/ri';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import AskToSignin from '../AskToSignin';

const AllArtsByStyle = () => {
  const { style } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const [loading, setLoading] = useState(false);
  // const [arts, setArts] = useState();
  const { allLikes, handleLikes, handleFollow, arts, setArts, allFollowings } =
    useContext(GlobalContext);

  useEffect(() => {
    setLoading(false);
    fetch(`/api/style/${style}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setArts(data.data);
          setLoading(true);
        } else console.log(data.message);
      })
      .catch((err) => {
        console.log('fetch data error: ' + err);
      });
  }, []);

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          {' '}
          {loading ? (
            <Products>
              {arts?.map((art) => {
                return (
                  <Product key={art._id}>
                    {console.log('hello', art._id)}
                    <ImageContainer>
                      <Img
                        src={art.url}
                        alt='art'
                        onClick={() => {
                          navigate(`/art/${art.name}/${art.sub}`);
                        }}
                      />
                    </ImageContainer>
                    <Div>
                      <Name
                        onClick={() => {
                          navigate(`/art/${art.name}/${art.sub}`);
                        }}
                      >
                        {art.name}
                      </Name>
                      <div>
                        <Title>Style: </Title>
                        <Name>{art.style}</Name>
                      </div>

                      {user.sub === art.sub ? (
                        ''
                      ) : (
                        <>
                          <div onClick={() => handleLikes(art._id)}>
                            <Title>Like:</Title>
                            <Name>
                              {allLikes?.length > 0 ? (
                                <>
                                  {allLikes?.some((like) => {
                                    return like === art._id;
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
                                  return following === art.sub;
                                }) ? (
                                  <div>
                                    <span>CLick to unfollow: </span>
                                    <Button
                                      onClick={() => handleFollow(art.sub)}
                                    >
                                      <RiUserFollowFill fill={'#2d545e'} />
                                    </Button>
                                  </div>
                                ) : (
                                  <div>
                                    <span>Click to Follow: </span>
                                    <Button
                                      onClick={() => handleFollow(art.sub)}
                                    >
                                      <RiUserUnfollowLine color={'black'} />
                                    </Button>
                                  </div>
                                )}{' '}
                              </>
                            ) : (
                              <div>
                                <span>Click to Follow: </span>
                                <Button onClick={() => handleFollow(art.sub)}>
                                  <RiUserUnfollowLine color={'black'} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </Div>
                  </Product>
                );
              })}
            </Products>
          ) : (
            <LoadingSpinner top={40} />
          )}
        </>
      ) : (
        <AskToSignin />
      )}
    </Wrapper>
  );
};

const Div = styled.div`
  margin-top: 15px;
`;

const Name = styled.span`
  margin-left: 5px;

  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  text-align: left;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  width: 45px;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.span``;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 1200px;
  margin: auto;

  margin-bottom: 150px;
`;
const Product = styled.div`
  border: 1px solid #cccccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  /* text-decoration: none; */
  text-align: center;
  color: black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 5px 5px #c89666;
  /* justify-content: space-between; */
  /* align-items: center; */
`;

const ImageContainer = styled.div`
  height: 213px;
  width: 100%;

  border-bottom: 1px solid #cccccc;
`;

const Img = styled.img`
  object-fit: cover;
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
  box-shadow: 10px 5px 5px #c89666;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  min-width: 1024px;
  min-height: calc(100vh - 110px);
  background-color: var(--color-Sand-Tan);
`;
export default AllArtsByStyle;
