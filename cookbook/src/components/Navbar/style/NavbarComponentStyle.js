import styled from 'styled-components';
import { Container, InputStyled, LinkStyled, Logo } from '../../common/StylesComponent';

export const NavbarStyle = styled(Container)`
  position: sticky;
  
  flex-wrap: wrap;
  min-width: 425px;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  background: var(--pure-white);
`;
export const SearchStyled = styled(InputStyled)`
  height: 35px;
  width: 381px;

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
`;

export const NavbarLogo = styled(Logo)`
  align-self: center;
  justify-content: center;
`;
