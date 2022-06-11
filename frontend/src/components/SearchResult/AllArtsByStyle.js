import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../LoadingSpinner';
import Comments from '../Comments';
import { AiFillHeart } from 'react-icons/ai';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import AskToSignin from '../AskToSignin';

const AllArtsByStyle = () => {
  const { style } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const [loading, setLoading] = useState(false);
  const [arts, setArts] = useState();
  const { like, handleLikes } = useContext(GlobalContext);

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

  console.log('+++++++++++', arts);
  console.log('===========', style);

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
                          <div onClick={() => handleLikes()}>
                            <Title>Like:</Title>
                            <Name>
                              <AiFillHeart
                                fill={like ? 'rgb(224, 36, 94)' : 'black'}
                              />
                            </Name>
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
