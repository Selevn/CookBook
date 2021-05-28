import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { FormDiv } from '../Login/style/LoginComponentStyle';
import {
  Logo,
  ButtonStyled,
  Container,
  InputStyled,
  LabelStyled,
  LinkStyled,
  InputFeedback,
} from '../common/StylesComponent';
import { Login, Register } from '../../Connectors/dataProvider';
import { profileActions } from '../../Redux/Profile';
import { authActions } from '../../Redux/AuthKey';
import { ServerMessageHandler } from './ResponseSuccesHandler';
import { validateEmail, validatePassword } from '../../validator/validator';

const FormComponent = ({ register }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const LoginFunction = useCallback((email, password) => {
    (async () => {
      const answer = await Login({ email, password });
      ServerMessageHandler(
        answer,
        () => {
          dispatch(profileActions.setProfile(answer.user));
          dispatch(authActions.setToken(answer.token));
          history.push('/');
        },
        null,
      );
    })();
  }, []);
  const RegisterFunction = useCallback((email, password) => {
    (async () => {
      const answer = await Register({ email, password });
      ServerMessageHandler(
        answer,
        () => {
          history.push('/login');
        },
        null,
      );
    })();
  }, []);

  return (
    <FormDiv vertical>
      <Logo logoHeight="50px" />
      <Container vertical>
        <br />
        <h1>{register ? 'Join our community' : 'Welcome back'}</h1>
        <p>
          {register ? 'Already have an account?' : 'New here?'}
          <LinkStyled to={register ? '/login' : '/register'}>
            {register ? ' Sign In' : ' Create an account'}
          </LinkStyled>
        </p>
      </Container>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!validateEmail(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          } else if (!validatePassword(values.password)) {
            errors.password = 'Length must be more than 8';
          }

          if (register) {
            if (!values.passwordRepeat) {
              errors.passwordRepeat = 'Required';
            } else if (values.passwordRepeat !== values.password) {
              errors.passwordRepeat = 'Passwords is not the same';
            }
          }
          return errors;
        }}
        onSubmit={(values) => {
          if (register) RegisterFunction(values.email, values.password, values.passwordRepeat);
          else LoginFunction(values.email, values.password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <Container minHeight={register ? '60%' : '40%'} vertical justifyContent="center">
              <Container vertical minHeight="80%" justifyContent="space-around">
                <Container vertical>
                  <LabelStyled>Email</LabelStyled>
                  <InputStyled
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={errors.email && touched.email && 'error'}
                  />
                  {errors.email && touched.email && <InputFeedback>{errors.email}</InputFeedback>}
                </Container>

                <Container vertical>
                  <Container justifyContent="space-between">
                    <LabelStyled>Password</LabelStyled>
                    {register ? '' : <LinkStyled>Forgot password?</LinkStyled>}
                  </Container>
                  <InputStyled
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    name="password"
                    className={errors.password && touched.password && 'error'}
                  />
                  {errors.password && touched.password && (
                    <InputFeedback>{errors.password}</InputFeedback>
                  )}
                </Container>
                {register ? (
                  <Container vertical>
                    <LabelStyled>Repeat password</LabelStyled>
                    <InputStyled
                      className={errors.passwordRepeat && touched.passwordRepeat && 'error'}
                      value={values.passwordRepeat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="passwordRepeat"
                    />
                    {errors.passwordRepeat && touched.passwordRepeat && (
                      <InputFeedback>{errors.passwordRepeat}</InputFeedback>
                    )}
                  </Container>
                ) : (
                  ''
                )}
              </Container>
            </Container>
            <Container vertical justifyContent="center" minHeight="20%">
              <ButtonStyled onClick={handleSubmit}>{register ? 'Sign Up' : 'Sign In'}</ButtonStyled>
            </Container>
          </>
        )}
      </Formik>
    </FormDiv>
  );
};

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
