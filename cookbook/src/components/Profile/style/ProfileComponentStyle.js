import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled, Container, Image, ParagraphStyled } from '../../common/StylesComponent';

export const UserInformation = styled(Container)`
  max-width: 1400px;
  justify-content: center;
  margin: 100px auto 50px auto;
`;
const ProfileImageContainer = ({ src }) => {
  return (
    <Container>
      <Image src={src} width="160" height="160" />
    </Container>
  );
};
ProfileImageContainer.propTypes = {
  src: PropTypes.string,
};

export const ProfileImage = styled(Container)`
  width: 200px;
  height: 200px;
  border-radius: 102px;
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;

  margin: 0 15px 0 0;
`;
export const UserName = styled(ParagraphStyled)`
  font-size: 36px;
  font-family: 'Roboto Light', sans-serif;
`;
export const UserDescription = styled(ParagraphStyled)`
  width: 50%;
  font-family: 'Roboto Light', sans-serif;
  font-size: 20px;
  color: var(--text-gray);
  text-align: justify;
`;
export const UserTextContainer = styled(Container)`
  flex-direction: column;
  margin-left: 10px;
`;

export const AddContainer = styled(Container)``;
export const LinksContainer = styled(Container)``;
export const DataContainer = styled(Container)``;
export const AddButton = styled(ButtonStyled)`
  width: 212px;
  font-family: 'Roboto Light', sans-serif;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
`;
