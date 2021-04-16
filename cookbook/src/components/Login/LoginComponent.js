import React from "react";

import {FormDiv, ImageVegetables, MainDiv} from './style/LoginComponentStyle.js'
import {ButtonStyled, Container, InputStyled, LabelStyled, LinkStyled} from "../common/StylesComponent";
import {Logo} from "./style/FormComponentStyle";

const LoginComponent = () =>{
    return (<>
        <MainDiv>
            <Container flex='1'/>
            <FormDiv flex='2' vertical>
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
                                <LinkStyled>Fogrot password?</LinkStyled>
                            </Container>
                            <InputStyled/>
                        </Container>
                    </Container>
                </Container>
                <Container vertical justifyContent={"center"} minHeight={"20%"}>
                    <ButtonStyled>Sign in</ButtonStyled>
                </Container>
            </FormDiv>
                <Container flex='2'>
                    <ImageVegetables/>
                </Container>
            <Container flex='1'/>
        </MainDiv>
    </>)
}

export default  LoginComponent