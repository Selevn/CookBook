import React, { useState } from 'react';
import { ImageVegetable, ImageVegetablesContainer, MainDiv } from './style/LoginComponentStyle';
import { Container } from '../common/StylesComponent';
import FormComponent from '../MultyUsed/FormComponent';

const LoginComponent = () => {
  return (
    <>
      <MainDiv>
        <Container flex="2">
          <FormComponent
          />
        </Container>
        <ImageVegetablesContainer flex="2">
          <ImageVegetable />
        </ImageVegetablesContainer>
      </MainDiv>
    </>
  );
};

export default LoginComponent;
