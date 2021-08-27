import styled, { css } from 'styled-components';
import { Container, ParagraphStyled } from '../../../common/StylesComponent';

export const ViewsContainer = styled(Container)`
  color: var(--statistic-gray);

  ${(p) =>
    p.clickable &&
    css`
      :hover {
        cursor: pointer;
      }
    `}
`;
export const ViewsParagraph = styled(ParagraphStyled)`
  padding-left: 5px;
  line-height: 18px;
  font-size: 14px;
`;
