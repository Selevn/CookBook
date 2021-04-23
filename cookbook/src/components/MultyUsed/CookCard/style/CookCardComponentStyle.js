import styled, { css } from 'styled-components';
import { Container, ParagraphStyled } from '../../../common/StylesComponent';

export const CookCardContainer = styled(Container)`
  ${(p) => {
    return css`
      width: ${p.width};
      height: ${p.height};
    `;
  }}

  border-radius: 10px;
  padding: var(--padding-card);
  gap: 5px;
  box-shadow: 4px 4px 8px 0 var(--search-gray);
  background-color: var(--pure-white);

  @media (max-width: 540px) {
    transform: scale(0.9);
  }
`;
export const Name = styled(ParagraphStyled)`
  font-size: 24px;
`;
export const Author = styled(ParagraphStyled)`
  gap: 0;
  font-size: 15px;
  color: var(--light-black);
`;

export const MinimizedCard = styled(Container)`
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

  @media (min-width: 475px) {
    height: ${(p) => p.containerHeight || '255px'};
    width: ${(p) => p.containerWidth || '255px'};
  }
  @media (max-width: 475px) {
    height: 255px;
    width: 255px;
  }
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

export const CookCardImage = styled.img`
  margin: auto;
`;
