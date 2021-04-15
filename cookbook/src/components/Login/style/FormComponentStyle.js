import styled from 'styled-components';
import '../../../index.css'
import {StyledLink} from "../../MainStyles/StylesComponent";

export const FormDivStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 10% 3% 55%;
  font-family: Nunito;
`
export const FormStyled = styled.form`
  display: grid;
  
  justify-content: center;
  align-content: center;
  grid-template-columns: 1fr;
  
`
export const LabelStyled = styled.label`
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #7B7B80;
  padding-top: 25px;
  justify-self: start;
  align-self: start;
`
export const ForgotPasswordLink = styled(StyledLink)`
  justify-self: end;
  align-self: end;
`

export const PasswortDiv = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`


