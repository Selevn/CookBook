import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  NavbarLink,
  NavbarLogo,
  NavbarMain,
  NavbarStyle,
  SearchStyled,
} from './style/NavbarComponentStyle';
import { Container } from '../common/StylesComponent';

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const menuClick = () => setMenuOpen((s) => !s);

  return (
    <>
      <NavbarMain>
        <NavbarStyle hide={menuOpen}>
          <Menu onClick={menuClick} />
          <NavbarLogo alignSelf="center" className="mustBeHidden" />
          <Container flex={4} className="mustBeHidden">
            <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
              <NavbarLink>Cookbooks</NavbarLink>
            </Container>
            <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
              <NavbarLink>Recepies</NavbarLink>
            </Container>
          </Container>
          <Container flex={5} justifyContent="center" alignItems="center" className="mustBeHidden">
            <SearchStyled />
          </Container>
          <Container flex={4} className="mustBeHidden">
            <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
              <NavbarLink>Sign Up</NavbarLink>
            </Container>
            <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
              <NavbarLink>Sign In</NavbarLink>
            </Container>
          </Container>
        </NavbarStyle>
      </NavbarMain>
      <Container height="65px" />
    </>
  );
};

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
