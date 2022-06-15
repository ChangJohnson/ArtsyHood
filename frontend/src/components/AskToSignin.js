import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AskToSignin = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Message>Please Sign in to see the beautiful Arts</Message>
      <Button onClick={() => navigate('/')}>Go to HomePage</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 80vh;
`;

const Message = styled.div`
  margin-bottom: 25px;
  font-size: 25px;
`;

const Button = styled.button`
  align-items: center;
  appearance: none;
  background-color: #12343b;

  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #2d545e 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fcfcfd;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 12px;
  width: 120px;
  margin-top: 25px;
  margin-left: 25px;
`;

export default AskToSignin;
