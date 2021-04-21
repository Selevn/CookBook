import styled, { css } from 'styled-components';
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

export const MinimizedCard = styled(Container)`
  height: ${(p) => p.height || '255px'};
  width: ${(p) => p.width || '255px'};
  background: url(${(p) => p.image}) no-repeat center;
  background-size: cover;

  ${(p) =>
    p.type === 'large'
      ? css`
          border-radius: 25px;
        `
      : css`
          border-radius: 15px;
        `}

  position: relative;
`;
export const MinimizedCardText = styled(Container)`
  background: var(--pure-white);
  border-radius: 4px;
  padding: 8px 10px 7px 10px;
  font-size: ${(p) => (p.type === 'large' ? '26px' : '20px')};
  align-items: center;
  position: absolute;
  bottom: 25px;
  left: 25px;
`;
