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
import { MenuCard, CookCard } from '../MultyUsed/CookCard';

export const MainComponent = () => {
  return (
    <>
      <Container height="65px" />
      <Container height="680px" padding="0 0 90px 0">
        <Container
          padding="0 0 0 20px"
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
          <CookCard isLiked />
          <CookCard />
          <CookCard isCommented />
          <CookCard />
        </CookBooksList>
      </PopularBooksContainer>
      <PopularBooksContainer vertical>
        <H1Styled>Picked By Us</H1Styled>
        <CookBooksList puzzle>
          <MenuCard type="large" />
          <Container vertical>
            <MenuCard type="long" />
            <Container>
              <MenuCard type="small" />
              <MenuCard type="small" />
            </Container>
          </Container>
        </CookBooksList>
      </PopularBooksContainer>
      <Container color="var(--primary-color)">
        <PopularBooksContainer vertical>
          <H1Styled>Trending Reciepts</H1Styled>
          <CookBooksList>
            <CookCard />
            <CookCard isLiked />
            <CookCard isCommented />
            <CookCard />
          </CookBooksList>
        </PopularBooksContainer>
      </Container>
    </>
  );
};
