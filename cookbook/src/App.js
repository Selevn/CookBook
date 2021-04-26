import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
// eslint-disable-next-line
import { MainPage } from './components/MainPage';
// eslint-disable-next-line
import { Register } from './components/Register';
// eslint-disable-next-line
import { Login } from './components/Login';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Profile />
      <Footer />
    </>
  );
}

export default App;
