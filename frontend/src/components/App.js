import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStylesAndContext/GlobalStyles';
import Header from './Header/Header';
import Footer from './Footer';
import HomePage from './HomePage/HomePage';
import SearchResult from './SearchResult/SearchResult';
import AllArtsByStyle from './SearchResult/AllArtsByStyle';
import AskToSignin from './AskToSignin';
import UploadArtWork from './UploadArtWork';
import SingleArtWorkDetails from './SearchResult/SingleArtWorkDetails';
import UpdateProfile from './CurrentUser/UpdateProfile';
import UserProfile from './CurrentUser/UserProfile';
import AllOfUserArtWorks from './CurrentUser/AllOfUserArtWorks';
import ArtDetails from './ArtDetails';

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

              <Route path='/art-detail/:_id' element={<ArtDetails />} />

              <Route
                path='/search-result/:keyword'
                element={<SearchResult />}
              />
              <Route path='/yourArts' element={<AllOfUserArtWorks />} />

              <Route path='/userProfile' element={<UserProfile />} />

              <Route path='/updateProfile' element={<UpdateProfile />} />

              <Route
                path='/art/:name/:_id'
                element={<SingleArtWorkDetails />}
              />

              <Route path='/art/upload' element={<UploadArtWork />} />

              <Route path='/style/abstraction' element={<AllArtsByStyle />} />

              <Route path='/style/landscape' element={<AllArtsByStyle />} />

              <Route path='/style/portrait' element={<AllArtsByStyle />} />

              <Route path='/style/streetArt' element={<AllArtsByStyle />} />

              <Route path='/style/penAndInk' element={<AllArtsByStyle />} />

              <Route path='/style/urbanArt' element={<AllArtsByStyle />} />
            </Routes>

            <Footer />
          </Main>
        </BrowserRouter>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
`;

const Main = styled.div`
  /* display: flex;
  flex-direction: column; */
  min-height: calc(100vh - 350px);
  min-width: 1024px;
`;

export default App;
