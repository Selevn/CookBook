import React, { useState } from 'react';
import { Container } from '../common/StylesComponent';
import person from '../common/images/Person.jpeg';
import {
  AddButton,
  AddContainer,
  DataContainer,
  ProfileImage,
  ProfileImageWrapper,
  UserDescription,
  UserInformation,
  UserName,
  UserTextContainer,
  LinksContainer,
  UserLinks,
} from './style/ProfileComponentStyle';
import { Settings } from '../Settings';

const ProfileComponent = () => {
  const [addMenu, setAddMenu] = useState(false);

  return (
    <>
      <Container minHeight="20px" />
      <UserInformation>
        <ProfileImageWrapper>
          <ProfileImage src={person} />
        </ProfileImageWrapper>
        <UserTextContainer>
          <UserName>John Doe</UserName>
          <UserDescription>
            I don’t know about you but I love pizza. Especially when that pizza comes with Papa
            John’s very own garlic pizza sticks.
          </UserDescription>
        </UserTextContainer>
        <AddContainer>
          <AddButton
            onClick={() => {
              setAddMenu((s) => !s);
            }}
          >
            Add New CookBook
          </AddButton>
          {addMenu && (
            <>
              <AddButton secondary>Add New CookBook</AddButton>
              <AddButton secondary>Add New Reciept</AddButton>
            </>
          )}
        </AddContainer>
      </UserInformation>
      <Container>
        <LinksContainer>
          <UserLinks>My CookBooks</UserLinks>
          <UserLinks className="active">My Recepies</UserLinks>
          <UserLinks>My Settings</UserLinks>
        </LinksContainer>
      </Container>

      <DataContainer>
        {/* <CookCard type="normal" />
        <CookCard type="normal" />
        <CookCard type="normal" />
        <CookCard type="normal" /> */}
        {/* <Recipe />
        <Recipe />
        <Recipe />
        <Recipe /> */}
        <Settings />
      </DataContainer>
    </>
  );
};

export default ProfileComponent;
