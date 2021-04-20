import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import { MainComponent } from './components/MainPage/MainPageComponent';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <MainComponent />

      {/* <Login/>
      <Register/> */}
    </>
  );
}

export default App;
