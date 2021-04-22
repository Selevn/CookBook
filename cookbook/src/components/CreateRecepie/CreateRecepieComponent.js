import React from 'react';
import { AiOutlineClose } from 'react-icons/all';
import { ButtonStyled, H1Styled, InputStyled, ParagraphStyled } from '../common/StylesComponent';

import {
  CloseIngredient,
  DescriptionInput,
  HeaderStyled,
  Ingredient,
  IngredientsContainer,
} from './style/CreateRecepieComponentStyle';
import {
  ControllButtons,
  CreateCookBookPage,
  TitleContainer,
} from '../CreateCookBook/style/CreateCookBookComponentStyle';

const CreateRecepieComponent = () => {
  return (
    <CreateCookBookPage>
      <H1Styled size="56px">Create a new recepie</H1Styled>
      <TitleContainer>
        <HeaderStyled>Recepie title</HeaderStyled>
        <InputStyled placeholder="Title" />
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Recepie picture</HeaderStyled>
        <ButtonStyled small light>
          Upload
        </ButtonStyled>
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Description</HeaderStyled>
        <DescriptionInput placeholder="Description" />
      </TitleContainer>
      <TitleContainer>
        <HeaderStyled>Ingredients</HeaderStyled>
        <InputStyled placeholder="Fourth ingredient" />
      </TitleContainer>
      <IngredientsContainer>
        <Ingredient>
          <ParagraphStyled>first ing, 100g</ParagraphStyled>
          <CloseIngredient>
            <AiOutlineClose size="22px" />
          </CloseIngredient>
        </Ingredient>
        <Ingredient>
          <ParagraphStyled>second ing, 100g</ParagraphStyled>
          <CloseIngredient>
            <AiOutlineClose size="22px" />
          </CloseIngredient>
        </Ingredient>
      </IngredientsContainer>
      <TitleContainer>
        <HeaderStyled>Directions</HeaderStyled>
        <DescriptionInput placeholder="Directions" />
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

export default CreateRecepieComponent;
