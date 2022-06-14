import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <Wrapper>
      <Div>
        <Links to='/'>
          <Logo src={window.location.origin + '/ArtsyHoodLogo.png'} />
        </Links>{' '}
      </Div>
      <Icons>
        <BsTwitter color='white' />
        <BsInstagram color='white' />
        <BsFacebook color='white' />
      </Icons>
      <TermsAndConditions>
        <Terms>
          <Span>Privacy Statement</Span>
          <Span>|</Span>
          <Span>Terms of use</Span>
          <Span>|</Span>
          <Span>Partners</Span>
        </Terms>
        <Copyright>© 2022 Foodies Company. All rights reserved.</Copyright>
      </TermsAndConditions>
    </Wrapper>
  );
};

const Span = styled.span`
  margin-left: 15px;
`;

const TermsAndConditions = styled.div`
  top: 90%;
  left: 50%;
  transform: translate(-50%, -90%);
  position: absolute;
  color: #ffffff;
  display: flex;
  display-direction: column;
`;

const Terms = styled.div``;

const Copyright = styled.div``;

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const Icons = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  font-size: 25px;
  align-items: center;
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;

  /* display: flex;
  justify-content: center;
  align-items: center; */
  background-color: var(--color-Night-Blue-Shadow);
  max-height: 315px;
  min-width: 1024px;
  width: 100%;
`;

const Links = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-left: 25px;
`;

const Logo = styled.img`
  width: 105px;
`;

export default Footer;
