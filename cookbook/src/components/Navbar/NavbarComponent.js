import React, { useState } from 'react';
import {
  Menu,
  NavbarLink,
  NavbarLogo,
  NavbarMain,
  NavbarStyle,
} from './style/NavbarComponentStyle';
import { ButtonStyled, Container } from '../common/StylesComponent';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';
import SearchBlock from './NavbarSearch';
import { useLogout } from '../MultyUsed/CustomHooks/useLogout';

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const menuClick = () => setMenuOpen((s) => !s);

  const { profile } = useReduxState();
  const Logout = useLogout();

  return (
    <>
      <NavbarMain>
        <NavbarStyle hide={menuOpen}>
          <Menu onClick={menuClick} />
          <NavbarLogo alignSelf="center" className="mustBeHidden" href="/" />
          <Container flex={4} className="mustBeHidden">
            <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
              <NavbarLink to="/search/cookbooks">Cookbooks</NavbarLink>
            </Container>
            <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
              <NavbarLink to="/search/recipes">Recepies</NavbarLink>
            </Container>
          </Container>
          <Container flex={5} justifyContent="center" alignItems="center" className="mustBeHidden">
            <SearchBlock />
          </Container>
          {!profile && (
            <Container flex={4} className="mustBeHidden">
              <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
                <NavbarLink to="/register">Sign Up</NavbarLink>
              </Container>
              <Container padding="15px" justifyContent="flex-start" alignItems="center" flex={1}>
                <NavbarLink to="/login">Sign In</NavbarLink>
              </Container>
            </Container>
          )}
          {profile && (
            <Container flex={4} className="mustBeHidden">
              <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
                <NavbarLink to={`/profile/${profile?._id}`}>
                  {`${profile?.name?.first} ${profile?.name?.last}`}
                </NavbarLink>
              </Container>
              <Container padding="15px" justifyContent="flex-end" alignItems="center" flex={1}>
                <ButtonStyled
                  tiny
                  light
                  secondary
                  onClick={() => {
                    Logout();
                  }}
                >
                  Logout
                </ButtonStyled>
              </Container>
            </Container>
          )}
        </NavbarStyle>
      </NavbarMain>
      <Container height="65px" />
    </>
  );
};

export default NavbarComponent;
