import styled from 'styled-components';
import { ButtonStyled, Container, H1Styled, LinkStyled } from '../../common/StylesComponent';

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
`;
export const PropertiesContainer = styled(Container)`
  flex-direction: column;
`;
export const PropName = styled(Container)`
  width: 200px;
  height: 50px;
`;
export const PropChange = styled(Container)`
  ${LinkStyled} {
    margin-left: 20px;
  }
  ${ButtonStyled} {
    font-weight: normal;
    padding: 0 10px;
  }
`;
