import React from 'react';
import { Container } from '../common/StylesComponent';
import { MainDiv } from './style/RegisterComponentStyle';
import FormComponent from '../MultyUsed/FormComponent';

const LoginComponent = () => {
  return (
    <>
      <MainDiv>
        <Container flex="2" />
        <Container flex="2">
          <FormComponent register />
        </Container>
      </MainDiv>
    </>
  );
};

export default LoginComponent;
