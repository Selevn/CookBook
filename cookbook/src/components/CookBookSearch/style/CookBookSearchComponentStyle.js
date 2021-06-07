import styled from 'styled-components';
import { ButtonStyled, Container, H1Styled, LabelStyled } from '../../common/StylesComponent';
import { LinksContainer } from '../../Profile/style/ProfileComponentStyle';

export const FilterContainer = styled(Container)`
  flex: 1;
  height: 417px;
  max-width: 350px;
  padding: 30px;
  flex-direction: column;
  gap: 25px;

  background: var(--pure-white);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.06);
  border-radius: 10px;

  .hideMy {
    color: var(--pure-black);
    font-size: 20px;
    margin: auto auto 15px 0;
  }
`;
export const ResultsContainer = styled(Container)`
  flex: 2;
  max-width: 70%;
  flex-direction: column;
  ${LinksContainer} {
    width: inherit;
    margin: 0 0 20px 0;
  }
`;
export const SearchMainComponent = styled(Container)`
  max-width: 1400px;
  min-height: 100vh;
  padding: 50px;
  margin: auto;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;

    ${FilterContainer} {
      width: 100%;
      max-width: none;
    }
    ${ResultsContainer} {
      width: 100%;
      max-width: none;
    }
  }
`;
export const HeaderContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${ButtonStyled} {
    align-self: center;
    line-height: 6px;
    font-size: 16px;
    height: 36px;
  }
`;
export const SortContainer = styled(Container)`
  gap: 15px;
  flex-direction: column;

  ${H1Styled} {
    font-size: 22px;
  }
  select {
    padding-left: 15px;
    background: var(--pure-white);
    height: 35px;
    border: 1px solid rgba(155, 178, 199, 0.75);
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 18px;
  }
`;

export const InputUniteContainer = styled(Container)`
  align-items: center;

  flex-direction: row;

  ${LabelStyled} {
    color: var(--pure-black);
  }
`;

export const ResultCardsContainer = styled(Container)`
  padding-top: 40px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
`;
