import styled, {css} from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  Container,
  Image, LinkAsButton,
  LinkStyled,
  ParagraphStyled,
} from '../../common/StylesComponent';

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
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 102px;
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;
`;
export const UserName = styled(ParagraphStyled)`
  font-size: 36px;
  font-family: 'Roboto Light', sans-serif;
  width: 100%;
`;
export const UserDescription = styled(ParagraphStyled)`
  font-family: 'Roboto Light', sans-serif;
  font-size: 20px;
  color: var(--text-gray);
  text-align: justify;
  align-self: start;
`;
export const UserTextContainer = styled(Container)`
  justify-content: start;
  align-items: center;
  flex-direction: column;
  flex: 4;
  width: 50%;
  max-width: 30vw;
`;

export const AddContainer = styled(Container)`
  flex: 1;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

export const LinksContainer = styled(Container)`
  justify-content: start;
  margin: auto;
  width: 1400px;
  gap: 50px;
  .active {
    border-bottom: 2px solid var(--primary-color);
    color: var(--pure-black);
  }

  @media (max-width: 1024px) {
    margin-top: 30px;
    justify-content: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    width: 300px;
  }
`;
export const UserLinks = styled(LinkStyled)`
  font-size: 26px;
  font-weight: normal;
  color: var(--text-gray);
`;

export const UserInformation = styled(Container)`
  max-width: 1400px;
  justify-content: space-around;
  margin: 100px auto 50px auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: auto;

    ${UserTextContainer} {
      max-width: 90vw;
    }
  }
`;

export const DataContainer = styled(Container)`
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 30px auto;
  padding: 10px;
  justify-content: center;
  gap: 40px;
  min-height: 410px;

  h1 {
    margin: auto;
  }
`;

const addCss = css`
  width: 212px;
  font-family: 'Roboto Light', sans-serif;
  font-size: 18px;
  text-align: center;
  font-weight: normal;
`
export const AddLink = styled(LinkAsButton)`
  ${addCss}
`;
export const AddButton = styled(ButtonStyled)`
  ${addCss}
`;

export const ProfileImageWrapper = styled(Container)`
  width: 300px;
`;
