import React from 'react';
import styled from 'styled-components';
import logo from '../common/images/FeedMe.jpg';

const LogoImage = () => (
  <div>
    <img src={logo} alt="Logo" />
  </div>
);

export const Logo = styled(LogoImage)`
  width: 100px;
  height: 30px;
`;
