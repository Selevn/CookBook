import styled from 'styled-components';
import {
    ButtonStyled,
    Container,
    H1Styled,
    InputStyled,
    LinkStyled,
    TextInputStyled,
} from '../../common/StylesComponent';
import {Fragment} from "react";
import {FaChevronLeft} from "react-icons/all";

export const HeaderStyled = styled.h3`
  font-size: 24px;
`;

export const DescriptionInput = styled(TextInputStyled)`
  height: 170px;
  font-size: 20px;
  padding: 12px;
`;
export const ItemContainer = styled(Container)`
  flex-direction: column;
  max-width: 1400px;
  margin: auto;
  padding: 70px;
  min-height: 100vh;

  @media (max-width: 500px) {
    padding: 20px;
  }
`;
export const CookBookContainer = styled(Container)`
  flex-direction: column;

  ${LinkStyled} {
    font-size: 24px;
    font-weight: normal;
  }
`;


export const ItemPageImageBook = styled(Container)`
  height: 304px;
  position: relative;
  width: 455px;
  border-radius: 8px;
  background: url(${(p) => p.src}) no-repeat center;
  background-size: cover;
  @media (max-width: 500px) {
    width: 375px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
`;
export const SliderStyle = styled.div`
  position: relative;

  .chevronLeft, .chevronRight {
    color: var(--styled-gray);
    background-color: var(--search-gray);
    opacity: 0.1;
    font-size: 50px;
    height: 304px;
    position: absolute;
    z-index: 999;
    top: 0;
  }

  .chevronLeft:hover, .chevronRight:hover {
    cursor: pointer;
    opacity: 0.4;
  }

  .chevronRight {
    right: 0;
  }
`;
export const Description = styled(Container)`
  max-width: 455px;
  flex-direction: column;
  padding-left: 20px;

  ${H1Styled} {
    padding-bottom: 20px;
  }
`;
export const RecipeStatsContainer = styled(Container)`
  width: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  align-items: start;
  margin-bottom: 20px;
`;
export const RecipeStats = styled(Container)`
  width: 50%;
  align-items: center;
  padding: 15px;
  flex-direction: column;

  ${H1Styled} {
    font-size: 28px;
    padding-bottom: 15px;
  }

  @media (max-width: 728px) {
    width: 90%;
    padding: 10px;
    ul,
    ol {
      font-size: 18px;

      li {
        span {
          max-width: 400px;
        }
      }
    }
  }
  @media (max-width: 500px) {
    padding: 7px;
    ul,
    ol {
      font-size: 14px;
    }
  }

  ol {
    font-size: 20px;
    list-style-type: none;
    counter-reset: elementcounter;

    li {
      margin: 5px 0;
      font-weight: bold;
      overflow-x: auto;
      break-inside: auto;

      span {
        font-weight: normal;
        break-inside: auto;
      }
    }

    li:before {
      content: 'Step ' counter(elementcounter) '. ';
      counter-increment: elementcounter;
    }
  }

  ul {
    font-size: 20px;

    li {
      margin: 5px 0;
      color: var(--primary-color);
      break-inside: auto;

      span {
        color: black;
        break-inside: auto;
      }
    }
  }
`;

export const InfoContainer = styled(Container)`
  flex-direction: row;
  padding: 30px;
  justify-content: space-evenly;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    ${ItemPageImageBook} {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 500px) {
    ${Description} {
      padding-left: 0;
    }
  }
`;

export const RecepiesContainer = styled(Container)`
  ${p => p.noTopPadding ? '' : `padding-top: 100px;`}
  flex-direction: column;

  ${H1Styled} {
    font-size: 40px;
  }

  .recipesContainer {
    flex-direction: column;
    ${p => p.noTopPadding ? '' : `margin-top: 30px;`}
    gap: 20px;
  }
`;
export const CommentsContainer = styled(RecepiesContainer)``;
export const CreateComment = styled(Container)`
  padding: 26px;
  gap: 16px;
  width: 100%;
  justify-content: center;

  ${InputStyled} {
    font-weight: normal;
    width: 80%;
  }

  @media (max-width: 500px) {
    padding: 8px;
    ${InputStyled} {
      font-size: 18px;
      width: 90%;
    }

    ${ButtonStyled} {
      width: 120px;
    }
  }
`;
export const Comments = styled(Container)`
  padding-top: 50px;
  flex-direction: column;
  gap: 50px;
`;


