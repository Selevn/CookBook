import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
  }

  body {
    min-height: 100vh;
    background: var(--main-background);
  }

  #root {
    min-height: 100vh;
    height: 100%;
  }

  .loading {
    justify-content: center;
    align-items: center;
    margin: auto;
    max-width: 300px;
    max-height: 300px;
  }

  .infinity-scroller {
    padding: 27px;
    gap: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;
