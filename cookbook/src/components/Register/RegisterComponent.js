import React, {useState, Suspense} from "react";
import {Container} from "../common/StylesComponent";
import {MainDiv} from "./style/RegisterComponentStyle";
const FormComponent = React.lazy(()=>import('../MultyUsed/FormComponent.js'))


const LoginComponent = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    return (<>
        <MainDiv>
            <Container flex={'2'}>

            </Container>
            <Container flex='2'>
                <Suspense fallback={<Container>Loading...</Container>}>
                    <FormComponent
                        register
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        passwordRepeat={passwordRepeat}
                        setPasswordRepeat={setPasswordRepeat}
                    />
                </Suspense>
            </Container>
        </MainDiv>
    </>)
}

export default  LoginComponent