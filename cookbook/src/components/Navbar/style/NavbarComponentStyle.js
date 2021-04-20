import styled from 'styled-components';
import { Container, InputStyled, LinkStyled, Logo } from '../../common/StylesComponent';

export const NavbarLogo = styled(Logo)`
  align-self: center;
  justify-content: center;
`;

export const NavbarStyle = styled(Container)`
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
`;
