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
import { Footer } from '../Footer';

const MainPageComponent = () => {
  return (
    <>
      <Container minHeight="680px" containerHeight="680px" maxHeight="780px">
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
          <Container vertical className="centier">
            <MenuCard type="long" />
            <Container className="centier">
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
            <CookCard type="bigImage" />
            <CookCard type="bigImage" isLiked />
            <CookCard type="bigImage" isCommented />
          </CookBooksList>
        </PopularBooksContainer>
      </Container>
      <Footer />
    </>
  );
};

export default MainPageComponent;
