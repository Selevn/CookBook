import React from 'react';
import {
  ButtonStyled,
  Container,
  Heading,
  ImageStyled,
  ParagraphStyled,
} from '../common/StylesComponent';

import FoodImg from '../common/images/mainFood.jpg';
import {
  CookBooksList,
  PopularBooksContainer,
  WelcomeContainer,
  WelcomeFoodContainer,
} from './style/MainPageComponentStyle';
import { MenuCard, CookCard } from '../MultyUsed/CookCard';

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
          <WelcomeContainer>
            <ParagraphStyled>Find and create your favourite cookbooks And Recipies</ParagraphStyled>
            <ButtonStyled>Create Account</ButtonStyled>
          </WelcomeContainer>
        </Container>
        <WelcomeFoodContainer>
          <ImageStyled src={FoodImg} alt="Food image" />
        </WelcomeFoodContainer>
      </Container>
      <PopularBooksContainer vertical>
        <Heading>Most Popular Cookbooks</Heading>
        <CookBooksList>
          <CookCard isLiked />
          <CookCard />
          <CookCard isCommented />
          <CookCard />
        </CookBooksList>
      </PopularBooksContainer>
      <PopularBooksContainer vertical>
        <Heading>Picked By Us</Heading>
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
          <Heading>Trending Reciepts</Heading>
          <CookBooksList>
            <CookCard type="bigImage" />
            <CookCard type="bigImage" isLiked />
            <CookCard type="bigImage" isCommented />
          </CookBooksList>
        </PopularBooksContainer>
      </Container>
    </>
  );
};

export default MainPageComponent;
