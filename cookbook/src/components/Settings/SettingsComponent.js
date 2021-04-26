import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled, Container, Heading, LinkStyled } from '../common/StylesComponent';
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
        <Heading>Personal information</Heading>
        <PropertiesContainer>
          <Container>
            <PropName>Name</PropName>
            <PropChange>
              {name}&nbsp;<LinkStyled>change</LinkStyled>
            </PropChange>
          </Container>
          <Container>
            <PropName>Email</PropName>
            <PropChange>
              {email}&nbsp;<LinkStyled>change</LinkStyled>
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
