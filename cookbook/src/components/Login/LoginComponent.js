import React from "react";

import {
    FormDiv,
    ImageVegetable,
    ImageVegetablesContainer,
    MainDiv
} from './style/LoginComponentStyle.js'
import {ButtonStyled, Container, InputStyled, LabelStyled, LinkStyled} from "../common/StylesComponent";
import {Logo} from "./style/FormComponentStyle";

const LoginComponent = () =>{
    return (<>
        <MainDiv>
            <Container flex='2'>
                <FormDiv vertical>
                <Logo flex='10'/>
                <Container vertical>
                    <br/>
                    <h1>Welcome back</h1>
                    <p>New here? <LinkStyled>Create an account</LinkStyled></p>
                </Container>
                <Container minHeight={'50%'} vertical justifyContent={"center"}>
                    <Container vertical minHeight={'80%'} justifyContent={"space-around"}>
                        <Container vertical>
                            <LabelStyled>Email</LabelStyled>
                            <InputStyled/>
                        </Container>
                        <Container vertical>
                            <Container justifyContent={"space-between"}>
                                <LabelStyled>Password</LabelStyled>
                                <LinkStyled>Forgot password?</LinkStyled>
                            </Container>
                            <InputStyled/>
                        </Container>
                    </Container>
                </Container>
                <Container vertical justifyContent={"center"} minHeight={"20%"}>
                    <ButtonStyled>Sign in</ButtonStyled>
                </Container>
            </FormDiv>
            </Container>
            <ImageVegetablesContainer flex={'2'}>
                <ImageVegetable/>
            </ImageVegetablesContainer>
        </MainDiv>
    </>)
}

export default  LoginComponent