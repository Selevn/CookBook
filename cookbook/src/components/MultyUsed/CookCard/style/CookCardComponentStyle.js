import styled from 'styled-components';
import { Container, ParagraphStyled } from '../../../common/StylesComponent';

export const CookCardContainer = styled(Container)`
  max-width: 255px;
  max-height: 360px;
  border-radius: 10px;

  padding: 20px;
  gap: 5px;

  box-shadow: 4px 4px 8px 0 var(--search-gray);
  background-color: var(--pure-white);
`;
export const Name = styled(ParagraphStyled)`
  font-size: 24px;
`;
export const Author = styled(ParagraphStyled)`
  gap: 0;
  font-size: 17px;
  color: var(--light-black);
`;
