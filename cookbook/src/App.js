import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import { MainPage } from './components/MainPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <MainPage />
    </>
  );
}

export default App;
