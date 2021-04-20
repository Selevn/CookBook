import React from 'react';
import { ButtonStyled, Container, ImageStyled, ParagraphStyled } from '../common/StylesComponent';

import FoodImg from '../common/images/mainFood.jpg';
import { WelcomeDiv, WelcomeFoodDiv } from './style/MainPageComponentStyle';

export const MainComponent = () => {
  return (
    <>
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
    </>
  );
};
