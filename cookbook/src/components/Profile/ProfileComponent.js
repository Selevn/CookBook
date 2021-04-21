import React from 'react';
import { Container, LinkStyled } from '../common/StylesComponent';
import person from '../common/images/Person.jpeg';
import { CookCard } from '../MultyUsed/CookCard';
import {
  AddButton,
  AddContainer,
  DataContainer,
  ProfileImage,
  UserDescription,
  UserInformation,
  UserName,
  UserTextContainer,
} from './style/ProfileComponentStyle';
import { LinksContainer } from '../Footer/style/FooterComponentStyle';

const ProfileComponent = () => {
  return (
    <>
      <Container minHeight="20px" />
      <UserInformation>
        <ProfileImage src={person} />
        <UserTextContainer>
          <UserName>John Doe</UserName>
          <UserDescription>
            I don’t know about you but I love pizza. Especially when that pizza comes with Papa
            John’s very own garlic pizza sticks.
          </UserDescription>
        </UserTextContainer>
        <AddContainer>
          <AddButton>Add New CookBook</AddButton>
        </AddContainer>
      </UserInformation>
      <LinksContainer>
        <LinkStyled>My CookBooks</LinkStyled>
        <LinkStyled>My Recepies</LinkStyled>
        <LinkStyled>My Settings</LinkStyled>
      </LinksContainer>
      <DataContainer>
        <CookCard />
        <CookCard />
        <CookCard />
        <CookCard />
      </DataContainer>
    </>
  );
};

export default ProfileComponent;
