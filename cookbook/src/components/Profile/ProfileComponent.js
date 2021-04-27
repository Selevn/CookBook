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
import { CookCard } from '../MultyUsed/CookCard';
import { Recipe } from '../MultyUsed/Recipe';

const ProfileComponent = () => {
  const myBooks = 'myBooks';
  const myRecipes = 'myRecipes';
  const settings = 'settings';

  const [addMenu, setAddMenu] = useState(false);

  const [menu, setMenu] = useState(myBooks);

  return (
    <>
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
              <AddButton href="/newCookBook" secondary>
                Add New CookBook
              </AddButton>
              <AddButton href="/newRecipe" secondary>
                Add New Reciept
              </AddButton>
            </>
          )}
        </AddContainer>
      </UserInformation>
      <Container>
        <LinksContainer>
          <UserLinks className={menu === myBooks ? 'active' : ''} onClick={() => setMenu(myBooks)}>
            My CookBooks
          </UserLinks>
          <UserLinks
            className={menu === myRecipes ? 'active' : ''}
            onClick={() => setMenu(myRecipes)}
          >
            My Recepies
          </UserLinks>
          <UserLinks
            className={menu === settings ? 'active' : ''}
            onClick={() => setMenu(settings)}
          >
            My Settings
          </UserLinks>
        </LinksContainer>
      </Container>

      <DataContainer>
        {menu === myBooks && (
          <>
            <CookCard type="normal" />
            <CookCard type="normal" />
            <CookCard type="normal" />
            <CookCard type="normal" />
          </>
        )}
        {menu === myRecipes && (
          <>
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
          </>
        )}
        {menu === settings && (
          <>
            <Settings />
          </>
        )}
      </DataContainer>
    </>
  );
};

export default ProfileComponent;
