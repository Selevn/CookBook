import React from 'react';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {MainComponent} from "./components/MainPage/MainPageComponent";

function App() {
  return (
    <>
      <GlobalStyle />
      {/*<Login/>
      <Register/>*/}
        <Navbar />
        <MainComponent/>
    </>
  );
}

export default App;
