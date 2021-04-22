import styled from 'styled-components';
// import React from 'react';
import { Container, InputStyled, TextInputStyled } from '../../common/StylesComponent';

export const PictureContainer = styled(Container)``;
export const DescriptionContainer = styled(Container)``;
export const RecepiesContainer = styled(Container)``;
export const CurrentRecipes = styled(Container)``;
export const ControllButtons = styled(Container)`
  justify-content: flex-end;
  gap: 15px;
  padding-top: 40px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const CreateCookBookPage = styled(Container)`
  max-width: 1400px;
  padding: 50px;
  flex-direction: column;
  margin: auto;
`;
export const TitleContainer = styled(Container)`
  gap: 20px;

  margin-top: 50px;

  flex-direction: column;
  max-width: 920px;

  ${InputStyled} {
    height: 45px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    border-radius: 10px;
  }
`;

export const HeaderStyled = styled.h3`
  font-size: 24px;
`;

export const DescriptionInput = styled(TextInputStyled)`
  height: 170px;
  font-size: 20px;
  padding: 12px;
`;
