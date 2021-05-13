import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {ButtonStyled, Container, H1Styled, InputStyled, LinkStyled} from '../common/StylesComponent';
import {
  PropChange,
  PropertiesContainer,
  PropName,
  SettingsContainer,
} from './style/SettingsComponentStyle';
import {FaImage} from "react-icons/all";
import {SendData, SendFile} from "../../Connectors/dataProvider";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {useDispatch} from "react-redux";
import {profileActions} from "../../Redux/Profile";
import {ROUTES} from "../../constants";

const Settings = ({ name, email, setUser }) => {
  const {auth, profile} = useReduxState()
  const [file, setFile] = useState();

  const fileChanges = (e)=>{
    e.preventDefault();
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const onFileSubmit = useCallback((e) => {
    e.preventDefault();
    if(!auth)
    {
      alert("You are not authorizated")
      return;
    }
    const formData = new FormData();
    formData.append('avatar',file);
    formData.append('id',profile._id);

    SendFile('/profile',formData, auth)
        .then((response) => {
          console.log(response)
          setUser(s=> ({...s, image: response.img}))
          alert("The file is successfully uploaded");
        }).catch((error) => {
      console.log("err",error)
    });
  },[file])

  const newPropertySend = async (fieldName, value) =>{
    const response = await SendData(ROUTES.CHANGE_ACC, {id:profile._id, field:fieldName, value:value});
    if(!response.success){
      alert("Smth went wrong")
    }
  }

  return (
      <>
        <SettingsContainer>
          <H1Styled>Personal information</H1Styled>
          <PropertiesContainer>
            <Container>
              <PropName>Name</PropName>
              <PropChange>
                {name}&nbsp;<LinkStyled onClick={()=>{
                const name = prompt('Enter new value')
                newPropertySend('name',name)
              }}>change</LinkStyled>
              </PropChange>
            </Container>
            <Container>
              <PropName>Email</PropName>
              <PropChange>
                {email}&nbsp;<LinkStyled>change</LinkStyled>
              </PropChange>
            </Container>
            <Container>
              <PropName>Password</PropName>
              <PropChange>
                <ButtonStyled secondary>Change Password</ButtonStyled>
              </PropChange>
            </Container>
            <Container>
              <form onSubmit={onFileSubmit}>
                <input type="file" name="avatar" onChange= {fileChanges}/>
                <input type={"submit"}/>
              </form>
            </Container>
          </PropertiesContainer>
        </SettingsContainer>
      </>
  );
};
Settings.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};
Settings.defaultProps = {
  name: 'John Doe',
  email: 'test@test.com',
};

export default Settings;
