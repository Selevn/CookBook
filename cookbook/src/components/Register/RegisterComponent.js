import React, { useState } from 'react';
import { Container } from '../common/StylesComponent';
import { MainDiv } from './style/RegisterComponentStyle';
import FormComponent from '../MultyUsed/FormComponent';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  return (
    <>
      <MainDiv>
        <Container flex="2" />
        <Container flex="2">
          <FormComponent
            register
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            passwordRepeat={passwordRepeat}
            setPasswordRepeat={setPasswordRepeat}
          />
        </Container>
      </MainDiv>
    </>
  );
};

export default LoginComponent;
