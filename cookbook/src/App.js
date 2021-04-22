import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
//import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
import { CreateCookBook } from './components/CreateCookBook';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <CreateCookBook />
      <Footer />
    </>
  );
}

export default App;
