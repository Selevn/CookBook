import styled from 'styled-components';
import { FaBars } from 'react-icons/all';
import { Container, LinkStyled, Logo } from '../../common/StylesComponent';

export const NavbarLogo = styled(Logo)`
  @media (max-width: 1024px) {
    margin-bottom: 15px;
  }
`;

export const NavbarStyle = styled(Container)`
  width: 100%;
  max-width: 1400px;

  min-height: 45px;
  position: sticky;

  flex-wrap: wrap;

  align-content: center;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }

  background: var(--pure-white);

  .mustBeHidden {
    @media (max-width: 1024px) {
      ${(p) => (p.hide ? 'display:none' : 'display:flex')}
    }
    @media (min-width: 1024px) {
      display: flex;
    }
  }
`;

export const NavbarLink = styled(LinkStyled)`
  color: var(--light-black);
  font-size: 20px;
`;

export const Menu = styled(FaBars)`
  color: var(--light-black);
  font-size: 40px;
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    align-self: flex-end;
    margin: auto 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const NavbarMain = styled(Container)`
  height: 65px;
  position: fixed;
  width: 100%;
  background-color: white;
  padding: 0;
  display: flex;
  justify-content: center;

  z-index: 999;

  @media (max-width: 1024px) {
    height: auto;
  }
`;
