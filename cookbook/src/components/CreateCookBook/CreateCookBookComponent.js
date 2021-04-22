import React from 'react';
import { ButtonStyled, H1Styled, InputStyled } from '../common/StylesComponent';

import { Recipe } from '../MultyUsed/Recipe';
import {
  ControllButtons,
  CreateCookBookPage,
  DescriptionInput,
  HeaderStyled,
  TitleContainer,
} from './style/CreateCookBookComponentStyle';

const CreateCookBookComponent = () => {
  return (
    <CreateCookBookPage>
      <H1Styled size="56px">Create a new cookbook</H1Styled>
      <TitleContainer>
        <HeaderStyled>Cookbook title</HeaderStyled>
        <InputStyled placeholder="Title" />
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Cookbook picture</HeaderStyled>
        <ButtonStyled small light>
          Upload
        </ButtonStyled>
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Description</HeaderStyled>
        <DescriptionInput placeholder="Description" />
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Recepies</HeaderStyled>
        <InputStyled placeholder="Fresh meat" />
      </TitleContainer>
      <TitleContainer>
        <Recipe />
        <Recipe />
      </TitleContainer>
      <ControllButtons>
        <ButtonStyled secondary small>
          Cancel
        </ButtonStyled>
        <ButtonStyled small>Save</ButtonStyled>
      </ControllButtons>
    </CreateCookBookPage>
  );
};

export default CreateCookBookComponent;
