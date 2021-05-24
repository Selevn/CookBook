import styled from "styled-components";
import {Container, InputStyled, LinkStyled} from "../../common/StylesComponent";

export const SearchStyled = styled(InputStyled)`
  height: 35px;
  max-width: 481px;
  min-width: 284px;
  background: var(--search-gray);
  border-radius: 37px;
  border: none;
  outline: none;
  font-size: 20px;
  padding: 3px 8px;
  color: var(--light-black);
`;
export const Results = styled(Container)`
  overflow:auto;
  padding: 5px;
  border-radius: 5px;
  flex-direction: column;
  position: absolute;
  top:60px;
  background-color: var(--main-background);
  width:600px;
  ${LinkStyled}{
    font-weight: lighter;
    font-size: 26px;
    text-align: center;
  }
  max-width: 100vw;
  max-height: calc(100vh - 60px);
  @media (max-width: 1023px) {
    top:200px;
    max-height: calc(100vh - 200px);

  }
  
`;
const CardHolder = styled(Container)`
  padding: 10px;
  width: 100%;
  flex-direction: column;
  gap:10px;
`;

export const Recipes = styled(CardHolder)`
`;
export const CookBooks = styled(CardHolder)`
`;


