import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../LoadingSpinner';
import Comments from '../Comments';
import { AiFillHeart } from 'react-icons/ai';
import { RiUserFollowFill, RiUserUnfollowLine } from 'react-icons/ri';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import AskToSignin from '../AskToSignin';

const AllArtsByStyle = () => {
  const { style } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const [loading, setLoading] = useState(false);
  // const [arts, setArts] = useState();
  const { allLikes, handleLikes, follow, handleFollow, arts, setArts } =
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
                    <ImageContainer>
                      <Img
                        src={art.url}
                        alt='art'
                        onClick={() => {
                          navigate(`/art-detail/${art._id}`);
                        }}
                      />
                    </ImageContainer>
                    <div>
                      <Title>ArtName:</Title>
                      <span>{art.name}</span>
                      <div>
                        <Title>Style: </Title>
                        <Name>{art.style}</Name>
                      </div>

                      <div>
                        <Title>Comments:</Title>
                        <span>{art.numOfComments ? art.numOfComments : 0}</span>
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
                                    <AiFillHeart fill={'black'} />
                                  )}
                                </>
                              ) : (
                                <AiFillHeart fill={'black'} />
                              )}
                            </Name>
                          </div>
                          {/* TODO follow */}
                          <div>
                            {follow ? (
                              <div>
                                <span>CLick to unfollow: </span>
                                <Button onClick={() => handleFollow(art.sub)}>
                                  <RiUserUnfollowLine color={'black'} />
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <span>Click to Follow: </span>
                                <Button onClick={() => handleFollow(art.sub)}>
                                  <RiUserFollowFill fill={'#2d545e'} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
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

  margin-bottom: 50px;
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
  /* justify-content: space-between; */
  /* align-items: center; */
`;
const Name = styled.span`
  margin-left: 5px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;
const ImageContainer = styled.div`
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;

const Img = styled.img`
  object-fit: cover;
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
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
