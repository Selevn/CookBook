import styled from 'styled-components';
import {
  Container,
  H1Styled,
  InputStyled,
  LinkStyled,
  TextInputStyled,
} from '../../common/StylesComponent';
import { Component } from 'react';

export const HeaderStyled = styled.h3`
  font-size: 24px;
`;

export const DescriptionInput = styled(TextInputStyled)`
  height: 170px;
  font-size: 20px;
  padding: 12px;
`;
export const ItemContainer = styled(Container)`
  flex-direction: column;
  max-width: 1400px;
  margin: auto;
  padding: 70px;
  min-height: 100vh;
`;
export const CookBookContainer = styled(Container)`
  flex-direction: column;
  ${LinkStyled} {
    font-size: 24px;
    font-weight: normal;
  }
`;
export const InfoContainer = styled(Container)`
  flex-direction: row;
  padding: 30px;
  justify-content: space-evenly;
`;
export const ItemPageImageBook = styled(Container)`
  height: 304px;
  width: 455px;
  border-radius: 8px;
  background: url(${(p) => p.src}) no-repeat center;
  background-size: cover;
`;
export const Description = styled(Container)`
  height: 304px;
  width: 455px;
  flex-direction: column;
  ${H1Styled} {
    padding-bottom: 20px;
  }
`;
export const RecepiesContainer = styled(Container)`
  padding-top: 100px;
  flex-direction: column;

  ${H1Styled} {
    font-size: 40px;
  }
  .recipesContainer {
    flex-direction: column;
    margin-top: 30px;
    gap: 20px;
  }
`;
export const CommentsContainer = styled(RecepiesContainer)``;
export const CreateComment = styled(Container)`
  padding: 26px;
  gap: 16px;
  width: 100%;
  justify-content: center;
  ${InputStyled} {
    font-weight: normal;
    width: 80%;
  }
`;
export const Comments = styled(Container)`
  padding-top: 50px;
  flex-direction: column;
  gap: 50px;
`;
