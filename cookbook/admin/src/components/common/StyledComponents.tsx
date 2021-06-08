import styled from 'styled-components';

export const Container = styled.div<{vertical?:boolean}>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;