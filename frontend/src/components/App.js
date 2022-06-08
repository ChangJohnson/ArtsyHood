import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStylesAndContext/GlobalStyles';
import Header from './Header/Header';
import Footer from './Footer';
import HomePage from './HomePage/HomePage';
import SearchResult from './SearchResult';
import ArtByStyle from './ArtByStyle';
import AskToSignin from './AskToSignin';
import UploadArtWork from './UploadArtWork';
import ArtWorksDetails from './ArtWorkDetails';
import UpdateProfile from './UpdateProfile';
import UserProfile from './UserProfile';

const App = () => {
  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Header />
          <Main>
            <Routes>
              <Route exact path='/' element={<HomePage />} />

              <Route path='/please-signin' element={<AskToSignin />} />

              <Route
                path='/search-result/:keyword'
                element={<SearchResult />}
              />

              <Route path='/userProfile' element={<UserProfile />} />

              <Route path='/updateProfile' element={<UpdateProfile />} />

              <Route path='/art/:_id' element={<ArtWorksDetails />} />

              <Route path='/art/upload' element={<UploadArtWork />} />

              <Route path='/style/abstraction' element={<ArtByStyle />} />

              <Route path='/style/landscape' element={<ArtByStyle />} />

              <Route path='/style/portrait' element={<ArtByStyle />} />

              <Route path='/style/streetArt' element={<ArtByStyle />} />

              <Route path='/style/penAndInk' element={<ArtByStyle />} />

              <Route path='/style/urbanArt' element={<ArtByStyle />} />
            </Routes>

            <Footer />
          </Main>
        </BrowserRouter>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
  min-width: 1024px;
`;

export default App;
