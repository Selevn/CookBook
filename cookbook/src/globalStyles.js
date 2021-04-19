import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
  }
  body {
    min-height: 100vh;
  }
  #root {
    min-height: 100vh;
    height: 100%;
  }
`;
