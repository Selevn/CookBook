import styled from 'styled-components';
import { ButtonStyled, Container, Heading, LinkStyled } from '../../common/StylesComponent';

export const SettingsContainer = styled(Container)`
  ${Heading} {
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
`;
export const PropName = styled(Container)`
  width: 200px;
  height: 50px;

  align-items: center;
`;
export const PropChange = styled(Container)`
  align-items: center;
  width: 200px;
  ${LinkStyled} {
    margin-left: 20px;
  }
  ${ButtonStyled} {
    font-weight: normal;
    padding: 0 10px;
    font-size: 16px;

    @media (max-width: 375px) {
      font-size: 14px;
    }
  }
`;
