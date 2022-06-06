import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { BiSearchAlt2, BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const { setDisplaySearchBar, displaySearchBar } = useContext(GlobalContext);

  return (
    <Wrapper>
      <Links to='/'>
        <Logo src={window.location.origin + '/art.png'} />
      </Links>
      <Ul>
        {!displaySearchBar ? (
          <RightSide>
            <SearchIcon>
              <BiSearchAlt2
                color='white'
                onClick={() => setDisplaySearchBar(true)}
              />
            </SearchIcon>
            {!isAuthenticated ? (
              <Button onClick={() => loginWithRedirect()}>
                <BiLogInCircle />
              </Button>
            ) : (
              <>
                <Avatar src={user.picture}></Avatar>
                <Button onClick={() => logout()}>
                  <BiLogOutCircle />
                </Button>
              </>
            )}
          </RightSide>
        ) : (
          <Searchbar>
            <SearchBar />
          </Searchbar>
        )}
      </Ul>
    </Wrapper>
  );
};

const SearchIcon = styled.span`
  font-size: 25px;
  padding-top: 8px;
`;

const Avatar = styled.img`
  margin-left: 10px;
  color: #e0e0e0;
  width: 30px;
  border-radius: 50%;
`;

const Logo = styled.img`
  width: 295px;
`;

const Ul = styled.ul`
  margin-top: 0;
  margin-right: 25px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon path:hover {
    fill: grey;
  }
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;
const Links = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-left: 25px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-Night-Blue-Shadow);
  height: 115px;
  min-width: 1024px;
  width: 100%;
`;

const Button = styled.button`
  margin-left: 15px;
  padding-top: 8px;
  font-size: 25px;
  border: none;
  background-color: transparent;
  width: fit-content;
  &:hover {
    cursor: pointer;
    color: var(--color-Night-Blue);
  }
`;

const Searchbar = styled.div`
  margin-right: 45px;
  color: white;
`;

export default Header;
