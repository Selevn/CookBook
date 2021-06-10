import styled from 'styled-components';

export const Container = styled.div<{vertical?:boolean}>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;

export const StatusContainer = styled(Container)`
    width: 100%;
    justify-content: space-between;
`