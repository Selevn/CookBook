import React from 'react';
import { ButtonStyled, H1Styled, InputStyled, ParagraphStyled } from '../common/StylesComponent';

import { Recipe } from '../MultyUsed/Recipe';
import {
  ControllButtons,
  CurrentRecipes,
  DescriptionContainer,
  PictureContainer,
  RecepiesContainer,
  TitleContainer,
} from './style/CreateCookBookComponentStyle';

const CreateCookBookComponent = () => {
  return (
    <>
      <H1Styled>Create a new cookbook</H1Styled>
      <TitleContainer>
        <ParagraphStyled>Cookbook title</ParagraphStyled>
        <InputStyled />
      </TitleContainer>
      <PictureContainer>
        <ParagraphStyled>Cookbook title</ParagraphStyled>
        <InputStyled />
      </PictureContainer>
      <DescriptionContainer>
        <ParagraphStyled>Description</ParagraphStyled>
        <InputStyled />
      </DescriptionContainer>
      <RecepiesContainer>
        <ParagraphStyled>Recepies</ParagraphStyled>
        <InputStyled />
      </RecepiesContainer>
      <CurrentRecipes>
        <Recipe />
        <Recipe />
      </CurrentRecipes>
      <ControllButtons>
        <ButtonStyled secondary>Cancel</ButtonStyled>
        <ButtonStyled>Save</ButtonStyled>
      </ControllButtons>
    </>
  );
};

export default CreateCookBookComponent;
