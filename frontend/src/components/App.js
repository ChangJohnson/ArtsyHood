import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Header from './Header/Header';
import Footer from './Footer';
import HomePage from './HomePage';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
