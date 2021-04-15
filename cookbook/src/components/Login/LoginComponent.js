import React from "react";

import {FormDiv, ImageVegetables, MainDiv} from './style/LoginComponentStyle.js'
import {FormComponent} from "./FormComponent";

export const LoginComponent = () =>{
    return (<>
        <MainDiv>
            <FormDiv>
                <FormComponent/>
            </FormDiv>
            <ImageVegetables/>
        </MainDiv>
    </>)
}

