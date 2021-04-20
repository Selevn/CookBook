import React from 'react';
import PropTypes from 'prop-types';
import { NavbarStyle } from './style/NavbarComponentStyle';
import { TestContainer } from '../common/StylesComponent';
import { Logo } from '../common/StylesComponent';

const NavbarComponent = () => (
  <NavbarStyle height="65px">
    <Logo alignSelf={'center'} />
    <TestContainer color="red" flex={2} />
    <TestContainer color="blue" flex={1} />
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
