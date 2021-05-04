import styled from 'styled-components';
import { ButtonStyled, Container, LinkStyled } from '../../../common/StylesComponent';
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
export const SaveContainer = styled(ToolsContainer)`
  bottom: 20px;
  position: static;
  right: 20px;
  padding: 0 15px 15px 0;
  margin: auto 0 0 auto;
  ${ButtonStyled} {
    height: 36px;
    width: 84px;
  }
`;

export const Statistics = styled(Container)`
  gap: 50px;
  padding-top: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
export const StatisticsContainer = styled(Container)`
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const RemoveContainer = styled(Container)`
  height: inherit;
  padding: 0 0 0 20px;
  justify-content: center;
  align-content: center;
  align-items: center;

  ${LinkStyled} {
    color: var(--text-gray);
    font-size: 24px;
    font-weight: normal;
  }
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

export const RecipeContainerWrapper = styled(Container)`
  @media (min-width: 768px) {
    max-height: 218px;
  }

  @media (max-width: 768px) {
    ${RemoveContainer} {
      padding: 0 10px;
      ${LinkStyled} {
        font-size: 17px;
      }
    }
  }
  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;

    ${RemoveContainer} {
      ${LinkStyled} {
        font-size: 17px;
      }
      height: 10px;
      margin: 0 auto;
    }
  }
`;
