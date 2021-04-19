import React from 'react';
import { GlobalStyle } from './globalStyles';

import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Login />
      <Register />
      <GlobalStyle />
      <Navbar />
    </>
  );
}

export default App;
