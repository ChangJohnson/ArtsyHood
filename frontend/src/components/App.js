import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Header from './Header/Header';
import Footer from './Footer';
import HomePage from './HomePage';
import SearchResult from './SearchResult';
import ArtByStyle from './ArtByStyle';
import AskToSignin from './AskToSignin';

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
            </Routes>
            <Routes>
              <Route path='/please-signin' element={<AskToSignin />} />
            </Routes>
            <Routes>
              <Route
                path='/search-result/:keyword'
                element={<SearchResult />}
              />
            </Routes>
            <Routes>
              <Route path='/style/abstraction' element={<ArtByStyle />} />
            </Routes>
            <Routes>
              <Route path='/style/landscape' element={<ArtByStyle />} />
            </Routes>
            <Routes>
              <Route path='/style/portrait' element={<ArtByStyle />} />
            </Routes>
            <Routes>
              <Route path='/style/streetArt' element={<ArtByStyle />} />
            </Routes>
            <Routes>
              <Route path='/style/penAndInk' element={<ArtByStyle />} />
            </Routes>
            <Routes>
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
