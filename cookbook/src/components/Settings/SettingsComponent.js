import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled, Container, H1Styled, LinkStyled } from '../common/StylesComponent';
import {
  PropChange,
  PropertiesContainer,
  PropName,
  SettingsContainer,
} from './style/SettingsComponentStyle';

const Settings = ({ name, email }) => {
  return (
    <>
      <SettingsContainer>
        <H1Styled>Personal information</H1Styled>
        <PropertiesContainer>
          <Container>
            <PropName>Name</PropName>
            <PropChange>
              {name} <LinkStyled>change</LinkStyled>
            </PropChange>
          </Container>
          <Container>
            <PropName>Email</PropName>
            <PropChange>
              {email} <LinkStyled>change</LinkStyled>
            </PropChange>
          </Container>
          <Container>
            <PropName>Password</PropName>
            <PropChange>
              <ButtonStyled secondary>Change Password</ButtonStyled>
            </PropChange>
          </Container>
        </PropertiesContainer>
      </SettingsContainer>
    </>
  );
};
Settings.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};
Settings.defaultProps = {
  name: 'John Doe',
  email: 'test@test.com',
};

export default Settings;
