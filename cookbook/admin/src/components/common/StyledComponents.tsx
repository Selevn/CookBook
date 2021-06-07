import styled from 'styled-components';

export const Container = styled.div<{vertical?:boolean}>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;

export const MainContainer = styled(Container)`
/*  height: 100%;
  min-height: 100vh;*/
`;
