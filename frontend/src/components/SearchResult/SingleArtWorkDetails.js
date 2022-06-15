import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import SubHeader from '../Header/SubHeader';
import Error from '../Error';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiUserFollowFill, RiUserUnfollowLine } from 'react-icons/ri';
import AskToSignin from '../AskToSignin';
import Comments from '../Comments';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';

// this component is to show the details of one specific product
const SingleArtWorkDetails = () => {
  const navigate = useNavigate();
  let { _id, name } = useParams();

  const {
    allLikes,
    artWorkDetails,
    setArtWorkDetails,
    handleLikes,
    follow,
    handleFollow,
    allFollowings,
  } = useContext(GlobalContext);

  // const [artWorkDetails, setArtWorkDetails] = useState();
  const { isAuthenticated, user } = useAuth0();
  const [error, setError] = useState();

  // fetch the product details
  useEffect(() => {
    setArtWorkDetails(null);
    fetch(`/api/art/${name}/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setArtWorkDetails(data.data);
        }
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
      });
  }, [name]);

  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }

  return (
    <Wrapper>
      <Products>
        {artWorkDetails ? (
          <>
            {isAuthenticated ? (
              <Product>
                <ImageContainer>
                  <Image src={artWorkDetails.url} alt='art' />
                </ImageContainer>
                <div>
                  <Title>ArtName:</Title>
                  <span>{artWorkDetails.name}</span>
                  <div>
                    <Title>Style:</Title>
                    <Name
                      onClick={() => navigate(`/style/${artWorkDetails.style}`)}
                    >
                      {artWorkDetails.style}
                    </Name>
                  </div>
                  <div>
                    <Title>Artist:</Title>
                    <Name
                      onClick={() =>
                        navigate(`/artistArts/${artWorkDetails.artist._id}`)
                      }
                    >
                      {artWorkDetails.artist.name}
                    </Name>
                  </div>
                  <div>
                    <Title>Comments:</Title>
                    <span>
                      {artWorkDetails.comments
                        ? artWorkDetails.comments.length
                        : 0}
                    </span>
                  </div>
                  {user.sub === artWorkDetails.sub ? (
                    ''
                  ) : (
                    <>
                      <div onClick={() => handleLikes(artWorkDetails._id)}>
                        <Title>Like:</Title>
                        <Name>
                          {allLikes?.length > 0 ? (
                            <>
                              {allLikes?.some((like) => {
                                return like === artWorkDetails._id;
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
                              return following === artWorkDetails.sub;
                            }) ? (
                              <div>
                                <span>Following: </span>
                                <Button
                                  onClick={() =>
                                    handleFollow(artWorkDetails.sub)
                                  }
                                >
                                  <RiUserFollowFill fill={'#2d545e'} />
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <span>Unfollow: </span>
                                <Button
                                  onClick={() =>
                                    handleFollow(artWorkDetails.sub)
                                  }
                                >
                                  <RiUserUnfollowLine color={'black'} />
                                </Button>
                              </div>
                            )}{' '}
                          </>
                        ) : (
                          <div>
                            <span>Unfollow: </span>
                            <Button
                              onClick={() => handleFollow(artWorkDetails.sub)}
                            >
                              <RiUserUnfollowLine color={'black'} />
                            </Button>
                          </div>
                        )}
                      </div>

                      <Comments artInfo={artWorkDetails} />
                    </>
                  )}
                </div>
              </Product>
            ) : (
              <AskToSignin />
            )}
          </>
        ) : (
          <LoadingSpinner top={40} />
        )}
      </Products>
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

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  min-height: 80vh;
  min-width: 100vw;
  justify-content: center;

  background-color: var(--color-Sand-Tan);
`;
const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1200px;
  min-width: 1000px;
  margin: auto;
`;
const Product = styled.div`
  border: 1px solid #cccccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
  box-shadow: 10px 5px 5px #c89666;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 80vh;

  margin-bottom: 200px;
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

const ImageContainer = styled.div`
  min-height: 180px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const Image = styled.img`
  min-height: 400px;
  margin-bottom: 10px;
  border-radius: 1%;
  object-fit: cover;
  width: 85%;
  box-shadow: 10px 5px 5px #c89666;
`;

export default SingleArtWorkDetails;
