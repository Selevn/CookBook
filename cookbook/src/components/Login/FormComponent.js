import React from "react";

import {ImageLogo} from './style/LoginComponentStyle.js'
import {StyledButton, StyledInput, StyledLink} from '../common/StylesComponent'
import {ForgotPasswordLink, FormDivStyled, FormStyled, H1, LabelStyled, PasswortDiv} from "./style/FormComponentStyle";

export const FormComponent = () =>{
    return (<>

        <FormDivStyled>
            <ImageLogo/>
            <h1>Welcome Back!</h1>

            <div>New here?<StyledLink> Create an account</StyledLink></div>

            <FormStyled>
                <LabelStyled>Email</LabelStyled>
                <StyledInput/>
                <PasswortDiv>
                    <LabelStyled>Password</LabelStyled>
                    <ForgotPasswordLink> Forgot password?</ForgotPasswordLink>
                </PasswortDiv>
                <StyledInput/>
            </FormStyled>
            <StyledButton>
                Sign In
            </StyledButton>
        </FormDivStyled>
    </>)
}