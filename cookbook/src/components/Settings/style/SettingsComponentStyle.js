import styled from 'styled-components';
import {
  ButtonStyled,
  Container,
  H1Styled,
  InputStyled,
  LinkStyled,
} from '../../common/StylesComponent';

export const SettingsContainer = styled(Container)`
  ${H1Styled} {
    margin-bottom: 30px;
  }

  flex-direction: column;

  width: 100%;
  padding: 20px;
  background: var(--pure-white);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.06);
  border-radius: 10px;

  height: 100%;
`;
export const PropertiesContainer = styled(Container)`
  flex-direction: column;
  gap: 5px;
`;
export const PropName = styled(Container)`
  width: 200px;
  height: 50px;

  align-items: center;
`;
export const RowContainer = styled(Container)`
  @media (max-width: 375px) {
    font-size: 14px;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${Container} {
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    ${InputStyled} {
      max-width: 70%;
    }
  }
`;

export const PropChange = styled(Container)`
  align-items: center;
  //width: ${(p) => (p.wide ? '400px' : '400px')} ;
  width: 100%;
  gap: 5px;
  ${LinkStyled} {
    margin-left: 20px;
  }
  ${InputStyled} {
    font-size: 20px;
  }

  ${ButtonStyled} {
    font-weight: normal;
    padding: 0 10px;

    font-size: 16px;

    @media (max-width: 375px) {
      font-size: 14px;
      width: 200px;
    }
  }
`;

export const ButtonsContainer = styled(Container)`
  width: 80%;
  gap: 5px;
`;

export const TextAreaStyled = styled.textarea`
  resize: vertical;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 20px;
  padding: 3px 8px;
  background: var(--pure-white);
  border: 1px solid var(--styled-gray);
`;
