import styled from "styled-components";
import {Container} from "../common/StyledComponents";
import {NavLink} from "react-router-dom";

export const UserContainer = styled(Container)`
  /*background-color: red;*/
  flex-direction: column;
  width: 100%;
`
export const UserLinks = styled(Container)`
  padding-left: 40px;
  justify-content: start;
  width: 1400px;
  gap: 50px;
  height: 40px;
  margin-bottom: 50px;
  border-bottom: 3px solid #ffffff00;

  /*background-color: green;*/
  .active {
    border-bottom: 3px solid var(--primary-color);
    color: var(--pure-black);
  }

  @media (max-width: 1024px) {
    width: auto;
    margin-bottom: 25px;
    padding-left: 20px;
    margin-top: 30px;
    justify-content: center;
  }
  @media (max-width: 768px) {
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    height: 160px;
    padding-left: 0;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    width: 300px;
  }
`
export const LinkItem = styled(NavLink)`
  font-size: 26px;
  font-weight: bold;
  color: var(--light-black);
  outline:none;
  text-decoration:none;
  :hover{
    cursor: pointer;
  }
`