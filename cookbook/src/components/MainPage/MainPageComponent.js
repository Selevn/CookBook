import React from 'react';
import {
  ButtonStyled,
  Container,
  H1Styled,
  ImageStyled,
  ParagraphStyled,
} from '../common/StylesComponent';

import FoodImg from '../common/images/mainFood.jpg';
import {
  CookBooksList,
  PopularBooksContainer,
  WelcomeDiv,
  WelcomeFoodDiv,
} from './style/MainPageComponentStyle';
import CookCardComponent from '../MultyUsed/CookCard/CookCardComponent';

export const MainComponent = () => {
  return (
    <>
      <Container height="65px" />
      <Container height="680px">
        <Container
          height="100%"
          flex="2"
          color="var(--light-black)"
          justifyContent="center"
          alignItems="center"
        >
          <WelcomeDiv>
            <ParagraphStyled>Find and create your favourite cookbooks And Recipies</ParagraphStyled>
            <ButtonStyled>Create Account</ButtonStyled>
          </WelcomeDiv>
        </Container>
        <WelcomeFoodDiv>
          <ImageStyled src={FoodImg} alt="Food image" />
        </WelcomeFoodDiv>
      </Container>
      <PopularBooksContainer vertical>
        <H1Styled>Most Popular Cookbooks</H1Styled>
        <CookBooksList>
          <CookCardComponent isLiked />
          <CookCardComponent />
          <CookCardComponent isCommented />
          <CookCardComponent />
        </CookBooksList>
      </PopularBooksContainer>
    </>
  );
};
