import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Profile />
    </>
  );
}

export default App;
