import {FormDiv} from "./style/LoginComponentStyle";
import {Logo} from "./style/FormComponentStyle";
import {ButtonStyled, Container, InputStyled, LabelStyled, LinkStyled} from "../common/StylesComponent";

const FormComponent = ({email, password, setEmail, setPassword})=>(
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
                    <InputStyled
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </Container>
                <Container vertical>
                    <Container justifyContent={"space-between"}>
                        <LabelStyled>Password</LabelStyled>
                        <LinkStyled>Forgot password?</LinkStyled>
                    </Container>
                    <InputStyled
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type={"password"}
                    />
                </Container>
            </Container>
        </Container>
        <Container vertical justifyContent={"center"} minHeight={"20%"}>
            <ButtonStyled>Sign in</ButtonStyled>
        </Container>
    </FormDiv>
)
export default FormComponent