import React from 'react'
import {ButtonStyled, Container, ImageStyled, ParagraphStyled} from "../common/StylesComponent";
import {ImageLogo} from "../Login/style/LoginComponentStyle";

import FoodImg from '../common/images/mainFood.jpg'

export const MainComponent = () => {
    return (
        <>
            <Container height={"680px"}>
                <Container
                    height={"100%"}
                    flex={'2'}
                    color={"var(--light-black)"}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Container
                        padding={"100px"}
                    vertical>
                        <ParagraphStyled
                            color={"white"}
                            size={"74px"}
                            transform={"capitalize"}>
                            Find and create
                            your favourite
                            cookbooks And Recipies
                        </ParagraphStyled>
                        <ButtonStyled>Join us</ButtonStyled>

                    </Container>

                </Container>
                <Container height={"100%"} flex={'1'} color={"var(--light-black)"} justifyContent={"flex-end"}>
                    <ImageStyled src={FoodImg} alt={"Food image"}/>
                </Container>
            </Container>

        </>
    )
}
