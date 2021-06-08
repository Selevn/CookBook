import styled from "styled-components";
import {Container} from "../common/StyledComponents";

export const MenuStyled = styled.header<{drawerWidth:Number}>`

  ${p => `width: calc(100% - ${p.drawerWidth}px);`}
  ${p => `margin-left: ${p.drawerWidth}px;`}
  background-color: var(--admin-background);
  top: 0;
  left: auto;
  right: 0;
  position: fixed;

  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: row;

  align-items: center;

  min-height: 60px;

  padding: 15px 15px 15px 15px;
  justify-content: space-evenly;
`
export const SearchStyled = styled.input<{ placeholder:string }>`
  min-height: 50px;
  padding-left: 50px;
  font-size: 24px;
  background: #FFFFFF;
  border:none;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
  border-radius: 50px;  
  flex-basis: 70%;

  max-width: 830px;
`
export const AdminCardStyled = styled.div`
  display: flex;
  width: 235px;
  height: 56px;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  flex-direction: row;
  overflow:hidden;
`
export const AdminImage = styled.div<{src:string}>`
  width: 56px;
  min-width: 56px;
  height: 56px;
  background: url("${p => p.src}") center;
  background-size: cover;
`
export const AdminData = styled(Container)`
  padding: 5px;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`
export const AdminName = styled.span`
  font-size: 18px;
  color:black;
`
export const AdminRole = styled.span`
  font-size: 14px;
  color:var(--styled-gray);
`

export const Main = styled(Container)<{headerHeight:number}>`
  height: 100%;
  min-height: calc(100vh - ${p=>p.headerHeight}px - 2*30px);
  margin-top: ${p=>p.headerHeight}px;
  width:100%;
  padding: 30px;
  background-color: var(--admin-background);
`






