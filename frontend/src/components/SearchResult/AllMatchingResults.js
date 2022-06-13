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
    <>
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
              <div>
                <span>ArtName:</span>
                <Name
                  onClick={() => {
                    navigate(`/art/${art.name}/${art.sub}`);
                  }}
                >
                  {art.name}
                </Name>
              </div>
              <div>
                <span>Style:</span>
                <Name onClick={() => navigate(`/style/${art.style}`)}>
                  {art.style}
                </Name>
              </div>

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
    </>
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
// const Price = styled.div`
//   font-weight: bold;
//   font-size: 20px;
//   padding: 10px;
//   border-radius: 10px;
//   text-align: left;
//   cursor: pointer;
// `;
// const Bottom = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
// const Status = styled.div`
//   background-color: #e3fcf7;
//   padding: 10px;
//   font-size: 16px;
//   border-radius: 10px;
//   &.outOfStock {
//     background-color: #f3f3f3;
//   }
// `;
const ImageContainer = styled.div`
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;
const Image = styled.img`
  width: 150px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default AllMatchingResults;
