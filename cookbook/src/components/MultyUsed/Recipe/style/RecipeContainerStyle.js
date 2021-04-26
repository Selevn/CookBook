import styled from 'styled-components';
import { Container } from '../../../common/StylesComponent';
import { Description } from '../../CookCard/style/CookCardComponentStyle';

export const ImageContainer = styled(Container)``;
export const ToolsContainer = styled(Container)`
  gap: 15px;
  position: static;
  margin: 0 0 auto auto;
  height: 30px;
  top: 20px;
  right: 20px;

  .tool:hover {
    cursor: pointer;
    color: var(--primary-color) !important;
  }
`;

export const Statistics = styled(Container)`
  gap: 50px;
`;

export const DataContainer = styled(Container)`
  flex-direction: column;
  max-width: 705px;
  margin-left: 25px;
  ${Statistics} {
    margin: auto auto 0 0;
  }
  ${Description} {
    margin: 10px auto 0 0;
  }
`;
export const RecipeContainer = styled(Container)`
  width: 100%;
  padding: 20px;
  background: var(--pure-white);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.06);
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: auto;
    ${ImageContainer} {
      margin-bottom: 15px;
    }
    ${DataContainer} {
      margin: 0;
    }
    ${ToolsContainer} {
      margin-top: 12px;
    }
    ${Description} {
      padding-bottom: 12px;
    }
  }
  @media (max-width: 375px) {
    transform: scale(0.85);
  }
  @media (max-width: 459px) {
    ${Statistics} {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
