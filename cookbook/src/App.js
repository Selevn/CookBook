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
// eslint-disable-next-line
import { CreateRecepie } from './components/CreateRecepie';
import { CookBookSearch } from './components/CookBookSearch';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <CookBookSearch />
      <Footer />
    </>
  );
}

export default App;
