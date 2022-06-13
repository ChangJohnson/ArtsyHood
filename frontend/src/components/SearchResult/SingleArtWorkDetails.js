import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import SubHeader from '../Header/SubHeader';
import Error from '../Error';
import { AiFillHeart } from 'react-icons/ai';
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

  // const handleLikes = () => {
  //   fetch('/api/update-likes', {
  //     body: JSON.stringify({
  //       _id: artWorkDetails._id,
  //       user: user.sub,
  //     }),
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         setLike(true);
  //       } else {
  //         setLike(false);
  //       }
  //     });
  // };

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
        {isAuthenticated ? (
          <>
            {artWorkDetails ? (
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
                              return following === artWorkDetails.sub;
                            }) ? (
                              <div>
                                <span>CLick to unfollow: </span>
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
                                <span>Click to Follow: </span>
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
                            <span>Click to Follow: </span>
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
              <LoadingSpinner top={40} />
            )}
          </>
        ) : (
          <AskToSignin />
        )}
      </Products>
    </Wrapper>
  );
};

const Div = styled.div`
  width: fit-content;
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

const Wrapper = styled.div`
  height: 80vh;
`;
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

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
const Price = styled.div`
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Status = styled.div`
  background-color: #e3fcf7;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  &.outOfStock {
    background-color: #f3f3f3;
  }
`;
const ImageContainer = styled.div`
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const Image = styled.img`
  width: 150px;
  margin-bottom: 10px;
`;

export default SingleArtWorkDetails;
