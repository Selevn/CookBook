import styled from 'styled-components';
import { Container, LinkStyled, TextInputStyled } from '../../common/StylesComponent';
import { TitleContainer } from '../../CreateCookBook/style/CreateCookBookComponentStyle';

export const Ingredient = styled(Container)`
  width: 200px;
  justify-content: space-between;
`;
export const CloseIngredient = styled(LinkStyled)`
  color: black;
`;

export const IngredientsContainer = styled(TitleContainer)`
  gap: 10px;
`;
export const HeaderStyled = styled.h3`
  font-size: 24px;
`;

export const DescriptionInput = styled(TextInputStyled)`
  height: 170px;
  font-size: 20px;
  padding: 12px;
`;
