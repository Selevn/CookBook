import React from "react";

import {ImageLogo} from './style/LoginComponentStyle.js'
import {StyledButton, StyledLink} from '../MainStyles/StylesComponent'
export const FormComponent = () =>{
    return (<>
        <ImageLogo/>
        <div>
            <h3>Welcome Back!</h3>

            New here? <StyledLink>Create an account</StyledLink>
            <form>
                <label>Email</label>
                <input/>
                <label>Password</label><input/>
            </form>
            <StyledButton>
                Sign In
            </StyledButton>
        </div>
    </>)
}