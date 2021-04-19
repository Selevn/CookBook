import React from 'react';
import { Login } from './components/Login';
import { GlobalStyle } from './globalStyles';
import { Register } from './components/Register';

function App() {
  return (
    <>
      <GlobalStyle />
      <Login />
      <Register />
    </>
  );
}

export default App;
