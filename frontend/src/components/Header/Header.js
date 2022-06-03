import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
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
            <BiSearchAlt2
              color='white'
              onClick={() => setDisplaySearchBar(true)}
            />
            {!isAuthenticated ? (
              <Button onClick={() => loginWithRedirect()}>Sign in</Button>
            ) : (
              <>
                <h3>user's picture</h3>
                <Button onClick={() => logout()}>Sign out</Button>
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
`;

const Button = styled.button`
  margin-left: 15px;
  border: none;
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
