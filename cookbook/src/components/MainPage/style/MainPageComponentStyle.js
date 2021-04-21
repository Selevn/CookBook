import styled, { css } from 'styled-components';
import { ButtonStyled, Container, H1Styled, ParagraphStyled } from '../../common/StylesComponent';

export const WelcomeDiv = styled(Container)`
  flex-direction: column;
  max-width: 800px;
  padding: 0 15px 0 15px;

  ${ButtonStyled} {
    margin: 25px auto auto 0;
    border-radius: 38px;
    font-size: 20px;
    width: 230px;
    height: 48px;
  }

  ${ParagraphStyled} {
    color: white;
    font-size: 74px;
    text-transform: capitalize;
  }

  @media (max-width: 500px) {
    ${ParagraphStyled} {
      color: white;
      font-size: 50px;
      text-transform: capitalize;
    }
  }
`;
export const WelcomeFoodDiv = styled(Container)`
  height: 100%;
  flex: 1;
  background: var(--light-black);
  justify-content: flex-end;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const PopularBooksContainer = styled(Container)`
  min-height: 530px;
  padding-bottom: 90px;
  padding-top: 45px;
  max-width: 1400px;
  margin: auto;

  justify-content: center;

  ${H1Styled} {
    font-size: 36px;
    margin: 0 auto 42px auto;
    text-align: center;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

export const CookBooksList = styled(Container)`
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 10px;
  justify-content: center;
  @media (max-width: 1023px) {
    justify-content: center;
  }
  .centier {
    flex-wrap: wrap;
    align-items: center;
    @media (max-width: 475px) {
      justify-content: center !important;
    }
  }
  ${(p) =>
    p.puzzle
      ? css`
          justify-content: center;

          ${Container} {
            gap: 15px;
            justify-content: space-between;
          }
        `
      : css``}
`;
