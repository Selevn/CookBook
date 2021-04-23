import styled, { css } from 'styled-components';
import { Container, LinkStyled, ParagraphStyled } from '../../../common/StylesComponent';

export const TextDataContainer = styled(Container)`
  flex-direction: column;
`;
export const Header = styled(Container)`
  padding: 0 20px;
  gap: 15px;
  align-items: baseline;
  ${ParagraphStyled} {
    color: var(--text-gray);
    font-size: 16px;
  }
`;
export const Name = styled(LinkStyled)`
  font-size: 24px;
  font-weight: normal;
`;

export const Body = styled(Container)`
  font-size: 20px;
  padding-left: 20px;
  margin: auto 0 0 auto;
`;

export const CommentContainer = styled(Container)`
  gap: 0;
  flex-direction: row;
  width: 100%;
  font-size: 15px;
  color: var(--light-black);
`;
export const PersonImage = styled(Container)`
  height: 80px;
  width: 80px;
  min-height: 80px;
  min-width: 80px;
  border-radius: 8px;
  background: url(${(p) => p.src}) no-repeat center;
  background-size: cover;
`;
