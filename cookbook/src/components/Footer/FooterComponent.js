import React from 'react';
import { Container, LinkStyled } from '../common/StylesComponent';
import { FooterLogo, FooterStyle, LinksContainer } from './style/FooterComponentStyle';

const Footer = () => {
  return (
    <>
      <Container color="var(--light-black)" justifyContent="center">
        <FooterStyle color="var(--light-black)">
          <Container>
            <FooterLogo />
          </Container>

          <LinksContainer>
            <LinkStyled>Cookbooks</LinkStyled>
            <LinkStyled>Recepies</LinkStyled>
            <LinkStyled>About Us</LinkStyled>
            <LinkStyled>Cookbooks@gmail.com</LinkStyled>
          </LinksContainer>
        </FooterStyle>
      </Container>
    </>
  );
};

export default Footer;
