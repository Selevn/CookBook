import styled, {css} from 'styled-components';

export const Container = styled.div<{ vertical?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
`;

export const StatusContainer = styled(Container)`
  width: 100%;
  justify-content: space-between;
`
export const TableImage = styled.img<{type:"user"|"cookbook"}>`
  height: 35px;
  ${
    p=>p.type === "user" && css`
      width: 35px;
      border-radius: 100%;
  `}
  ${
    p=>p.type === "cookbook" && css`
      width: 70px;
      border-radius: 10%;
  `}
  
  object-fit:cover;
  margin-right: ${p=>p.type==="user" ? "25px":"50px" };
`
