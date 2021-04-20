import styled from 'styled-components';
import { ButtonStyled, Container, ParagraphStyled } from '../../common/StylesComponent';

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

  @media (max-width: 425px) {
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
