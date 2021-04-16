import React, {useState, Suspense} from "react";
import {FormDiv, ImageVegetable, ImageVegetablesContainer, MainDiv} from './style/LoginComponentStyle.js'
import {Container} from "../common/StylesComponent";

const FormComponent = React.lazy(()=>import('./FormComponent.js'))


const LoginComponent = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (<>
        <MainDiv>
            <Container flex='2'>
                <Suspense fallback={<Container>Loading...</Container>}>
                    <FormComponent email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>
                </Suspense>
            </Container>
            <ImageVegetablesContainer flex={'2'}>
                <ImageVegetable/>
            </ImageVegetablesContainer>
        </MainDiv>
    </>)
}

export default  LoginComponent