import styled from 'styled-components';
import React from 'react';
import { Container, LinkStyled, LogoLight } from '../../common/StylesComponent';

export const FooterLogo = styled(() => <LogoLight center />)``;
export const FooterStyle = styled(Container)`
  width: 100%;
  max-width: 1400px;
  min-height: 90px;
  flex-wrap: wrap;
  padding: 10px 10px 10px 10px;
  align-content: center;
  @media (max-width: 1054px) {
    ${Container}:first-of-type {
      width: 100%;
      justify-content: center;
      padding-bottom: 10px;
    }
  }
`;

export const LinksContainer = styled(Container)`
  gap: 15%;

  margin: auto auto auto 15%;
  flex-wrap: nowrap;
  @media (max-width: 1054px) {
    margin: auto;
    flex-wrap: wrap;
    ${LinkStyled} {
      width: 100%;
      text-align: center;
    }
  }
  ${LinkStyled} {
    color: var(--pure-white);
    padding: 8px;
    min-width: 80px;
  }
`;
