import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Description from './Description';
import { useAuth0 } from '@auth0/auth0-react';
import AskToSignin from '../AskToSignin';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalStylesAndContext/GlobalContext';

const HomePage = () => {
  let navigate = useNavigate();

  // const { setIdToTrackArtWorks } = useContext(GlobalContext);

  const { isAuthenticated, user } = useAuth0();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetch('/api/add/user', {
  //       body: JSON.stringify({
  //         user,
  //       }),
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === 201) {
  //           setIdToTrackArtWorks(data.data);
  //         } else if (data.status === 404) {
  //           setIdToTrackArtWorks(data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [user]);

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
                    ? navigate('/style/abstraction')
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
                    ? navigate('/style/landscape')
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
                    ? navigate('/style/portrait')
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
                    ? navigate('/style/streetArt')
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
                    ? navigate('/style/penAndInk')
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
                    ? navigate('/style/urbanArt')
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
  padding-top: 25px;
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
  /* transform: ${(props) => `scale(${props.width}, ${props.height})`}; */
  &:hover {
    cursor: pointer;
    transform: scale(1);
  }
`;

const Styles = styled.div`
  max-width: 1400px;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(3, 600px);
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
`;

export default HomePage;
