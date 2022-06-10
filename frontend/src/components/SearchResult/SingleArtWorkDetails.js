import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import SubHeader from '../Header/SubHeader';
import Error from '../Error';
import AskToSignin from '../AskToSignin';

// this component is to show the details of one specific product
const SingleArtWorkDetails = () => {
  let navigate = useNavigate();
  let { _id, name } = useParams();

  const [artWorkDetails, setArtWorkDetails] = useState();
  const { isAuthenticated } = useAuth0();
  const [error, setError] = useState();

  // fetch the product details
  useEffect(() => {
    setArtWorkDetails(null);
    fetch(`/api/art/${name}/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setArtWorkDetails(data.data);
          console.log(data.data);
        }
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
      });
  }, [name]);

  console.log(artWorkDetails);

  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          {artWorkDetails ? (
            <>
              <Section>
                <Body>
                  <ArtContainer>
                    <Img src={artWorkDetails.url} alt='art' />
                    <ItemDescription>
                      ArtName:
                      <Name>{artWorkDetails.name}</Name>
                      Style:{' '}
                      <Click
                        onClick={() =>
                          navigate(`/brand/${artWorkDetails.style}`)
                        }
                      >
                        {artWorkDetails.style}
                      </Click>
                      <div>Artist:</div>
                      <Click
                        onClick={() =>
                          // TODO: add a path for people to see artist profile
                          navigate(`/artist/${artWorkDetails.artist.name}`)
                        }
                      >
                        {artWorkDetails.artist.name}
                      </Click>
                    </ItemDescription>
                  </ArtContainer>
                </Body>
              </Section>
            </>
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

const Wrapper = styled.div`
  height: 80vh;
`;
const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 40px 0;
  justify-items: center;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
`;
const Click = styled.span`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: #2279d2;
    text-decoration: underline;
  }
`;
const ItemDescription = styled.div`
  margin-left: 30px;
  max-width: 450px;
`;
const Name = styled.div`
  font-size: 25px;
  margin-bottom: 15px;
  color: #505050;
`;

const ArtContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px;
  height: 100%;
  gap: 20px;
`;
const Img = styled.img`
  height: 300px;
  align-items: left;
`;

export default SingleArtWorkDetails;
