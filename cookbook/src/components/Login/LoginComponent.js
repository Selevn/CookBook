import React, { useState } from 'react';
import { ImageVegetable, ImageVegetablesContainer, MainDiv } from './style/LoginComponentStyle';
import { Container } from '../common/StylesComponent';
import FormComponent from '../MultyUsed/FormComponent';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <MainDiv>
        <Container flex="2">
          <FormComponent
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
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
