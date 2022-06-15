// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { RiUserUnfollowLine, RiUserFollowFill } from 'react-icons/ri';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from '../AskToSignin';
// this component is used to display all the products in a grid.
// It is used in all components that need to display the products (for example Homepage.js, Brands.js, Category.js etc)
const AllMatchingResults = ({ arts }) => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const { handleFollow, allFollowings } = useContext(GlobalContext);

  return (
    <Wrapper>
      <Products>
        {arts?.map((art) => {
          return (
            <Product key={art._id}>
              <ImageContainer>
                <Image
                  src={art.url}
                  onClick={() => {
                    navigate(`/art/${art.name}/${art.sub}`);
                  }}
                />
              </ImageContainer>
              <NameDiv>
                <Name
                  onClick={() => {
                    navigate(`/art/${art.name}/${art.sub}`);
                  }}
                >
                  {art.name}
                </Name>
              </NameDiv>
              <StyleDiv>
                <span>Style:</span>
                <Name onClick={() => navigate(`/style/${art.style}`)}>
                  {art.style}
                </Name>
              </StyleDiv>

              {user.sub !== art.sub ? (
                <>
                  <div>
                    {allFollowings?.length > 0 ? (
                      <>
                        {allFollowings?.some((following) => {
                          return following === art.sub;
                        }) ? (
                          <div>
                            <span>CLick to unfollow: </span>
                            <Button onClick={() => handleFollow(art.sub)}>
                              <RiUserFollowFill fill={'#2d545e'} />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <span>Click to Follow: </span>
                            <Button onClick={() => handleFollow(art.sub)}>
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
              ) : (
                ''
              )}
            </Product>
          );
        })}
      </Products>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-Sand-Tan);
  min-height: 80vh;
  min-width: 100vw;
`;

const StyleDiv = styled.div`
  margin-bottom: 5px;
`;

const NameDiv = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  width: 45px;
  &:hover {
    cursor: pointer;
  }
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 1200px;
  margin: auto;
  min-height: 100%;
  margin-bottom: 150px;
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

  box-shadow: 10px 5px 5px #c89666;
`;
const Name = styled.span`
  margin-left: 5px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  font-weight: bold;
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
const Image = styled.img`
  width: 180px;
  height: 190px;
  margin-bottom: 10px;
  border-radius: 1%;
  object-fit: cover;
  box-shadow: 10px 5px 5px #c89666;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default AllMatchingResults;
