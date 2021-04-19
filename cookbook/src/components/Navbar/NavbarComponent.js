import React from 'react';
import PropTypes from 'prop-types';
import { NavbarLink, NavbarLogo, NavbarStyle, SearchStyled } from './style/NavbarComponentStyle';
import { Container } from '../common/StylesComponent';

const NavbarComponent = () => (
  <NavbarStyle minHeight="65px">
    <Container flex={1} />
    <NavbarLogo />
    <Container flex={4}>
      <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
        <NavbarLink>Cookbooks</NavbarLink>
      </Container>
      <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
        <NavbarLink>Recepies</NavbarLink>
      </Container>
    </Container>
    <Container flex={5} justifyContent="center" alignItems="center">
      <SearchStyled />
    </Container>
    <Container flex={4}>
      <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
        <NavbarLink>Sign Up</NavbarLink>
      </Container>
      <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
        <NavbarLink>Sign In</NavbarLink>
      </Container>
    </Container>
  </NavbarStyle>
);

NavbarComponent.propTypes = {
  register: PropTypes.bool,

  email: PropTypes.string,
  password: PropTypes.string,
  passwordRepeat: PropTypes.string,

  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  setPasswordRepeat: PropTypes.func,
};

export default NavbarComponent;
