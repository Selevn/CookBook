import React from 'react';
import PropTypes from 'prop-types';
import {FormDiv} from '../Login/style/LoginComponentStyle';
import {
    Logo,
    ButtonStyled,
    Container,
    InputStyled,
    LabelStyled,
    LinkStyled,
} from '../common/StylesComponent';
import {logReg} from "../../Connectors/dataProvider";

const FormComponent = ({
                           email,
                           password,
                           setEmail,
                           setPassword,
                           register,
                           passwordRepeat,
                           setPasswordRepeat,
                       }) => {

    const LoginFunction =  async () => {
        logReg('/api/login/', {email: email, password: password})
    }

    return (
        <FormDiv vertical>
            <Logo logoHeight="50px"/>
            <Container vertical>
                <br/>
                <h1>{register ? 'Join our community' : 'Welcome back'}</h1>
                <p>
                    {register ? 'Already have an account?' : 'New here?'}
                    <LinkStyled to={register ? '/login' : '/register'}>
                        {register ? ' Sign In' : ' Create an account'}
                    </LinkStyled>
                </p>
            </Container>
            <Container minHeight={register ? '60%' : '40%'} vertical justifyContent="center">
                <Container vertical minHeight="80%" justifyContent="space-around">
                    <Container vertical>
                        <LabelStyled>Email</LabelStyled>
                        <InputStyled value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Container>
                    <Container vertical>
                        <Container justifyContent="space-between">
                            <LabelStyled>Password</LabelStyled>
                            {register ? '' : <LinkStyled>Forgot password?</LinkStyled>}
                        </Container>
                        <InputStyled
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </Container>
                    {register ? (
                        <Container vertical>
                            <LabelStyled>Repeat password</LabelStyled>
                            <InputStyled
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                        </Container>
                    ) : (
                        ''
                    )}
                </Container>
            </Container>
            <Container vertical justifyContent="center" minHeight="20%">
                <ButtonStyled onClick = {register ? ()=>{} : ()=>{LoginFunction()}}>{register ? 'Sign Up' : 'Sign In'}</ButtonStyled>
            </Container>
        </FormDiv>
    )
}

FormComponent.propTypes = {
    register: PropTypes.bool,

    email: PropTypes.string,
    password: PropTypes.string,
    passwordRepeat: PropTypes.string,

    setEmail: PropTypes.func,
    setPassword: PropTypes.func,
    setPasswordRepeat: PropTypes.func,
};

export default FormComponent;
