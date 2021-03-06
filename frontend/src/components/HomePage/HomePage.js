import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Description from './Description';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from '../AskToSignin';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';

const HomePage = () => {
  let navigate = useNavigate();

  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <Banner src={window.location.origin + '/bannerPaint.jpeg'} />

      <Div>
        <Div2>
          <>Choose Your Style</>
        </Div2>
        <Flex>
          <Styles>
            <DivEffect>
              {' '}
              <Span>Abstraction</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/Abstraction')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/abstraction.jpeg'}
              ></Img>
            </DivEffect>
            <DivEffect>
              <Span>Landscape</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/Landscape')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/lanscapeArt.jpeg'}
              ></Img>
            </DivEffect>
            <DivEffect>
              <Span>Portrait</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/Portrait')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/portraitArt.jpeg'}
              ></Img>
            </DivEffect>
            <DivEffect>
              <Span>Street Art</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/Street-Art')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/streetArt.jpeg'}
              ></Img>
            </DivEffect>
            <DivEffect>
              <Span>Pen and Ink</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/PenAndInk')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/penAndInk.jpeg'}
              ></Img>
            </DivEffect>
            <DivEffect>
              <Span>Urban Art</Span>
              <Img
                onClick={() => {
                  isAuthenticated
                    ? navigate('/style/Urban-Art')
                    : navigate('/please-signin');
                }}
                src={window.location.origin + '/urbanArt.jpeg'}
              ></Img>
            </DivEffect>
          </Styles>
        </Flex>
        <Description />
      </Div>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Span = styled.span`
  font-family: Apple Chancery, css;
`;

const DivEffect = styled.div``;

const Div2 = styled.div`
  padding-top: 65px;
  display: flex;
  justify-content: center;
  font-family: Apple Chancery, css;
`;
const Wrapper = styled.div`
  width: 100%;
  min-width: 1024px;
`;
const Img = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.2s;
  box-shadow: 10px 5px 5px #c89666;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Styles = styled.div`
  width: 100%;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(3, 25%);
  justify-items: center;
  align-items: center;
  justify-content: center;
  justify-self: stretch;
  column-gap: 10px;
  row-gap: 40px;
`;

const Div = styled.div`
  margin-top: -3px;
  font-size: 85px;
  background-color: var(--color-Sand-Tan);
  min-height: calc(180vh - 200px);
`;

const Banner = styled.img`
  height: 50vh;
  object-fit: cover;
  width: 100%;
  box-shadow: 10px 5px 5px #c89666;
`;

export default HomePage;
