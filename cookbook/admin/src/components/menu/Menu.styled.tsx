import styled from "styled-components";

export const MenuStyled = styled.header<{drawerWidth:Number}>`

  ${p => `width: calc(100% - ${p.drawerWidth}px);`}
  ${p => `margin-left: ${p.drawerWidth}px;`}
  background-color: red;
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
`
export const SearchStyled = styled.input<{drawerWidth:Number}>`

  ${p => `width: calc(100% - ${p.drawerWidth}px);`}
  ${p => `margin-left: ${p.drawerWidth}px;`}
  background-color: red;
  top: 0;
  left: auto;
  right: 0;
  position: fixed;
  
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
`


