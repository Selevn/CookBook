import styled from 'styled-components';
import { FaBars } from 'react-icons/all';
import { Container, InputStyled, LinkStyled, Logo } from '../../common/StylesComponent';

export const NavbarLogo = Logo;

export const NavbarStyle = styled(Container)`
  min-height: 65px;
  position: sticky;

  flex-wrap: wrap;

  padding: 10px 10px 10px 100px;

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
export const SearchStyled = styled(InputStyled)`
  height: 35px;
  max-width: 481px;
  min-width: 284px;
  background: var(--search-gray);
  border-radius: 37px;
  border: none;
  outline: none;
  font-size: 20px;
  padding: 3px 8px;
  color: var(--light-black);
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
`;
