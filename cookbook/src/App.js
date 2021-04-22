import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';

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
