import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
// eslint-disable-next-line
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
// eslint-disable-next-line
import { CreateCookBook } from './components/CreateCookBook';
// eslint-disable-next-line
import { Login } from './components/Login';
import { CreateRecepie } from './components/CreateRecepie';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <CreateRecepie />
      <Footer />
    </>
  );
}

export default App;
