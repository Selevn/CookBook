import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from '../common/StylesComponent';
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
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES } from '../../constants';
import { ProfileCookBooks } from './CookBooks';
import { ProfileRecipes } from './Recipes';
import { Loading } from '../MultyUsed/Loading/Loading';

const ProfileComponent = ({ match }) => {
  const myBooks = 'myBooks';
  const myRecipes = 'myRecipes';
  const settings = 'settings';
  const [loading, setLoading] = useState(false);

  const [addMenu, setAddMenu] = useState(false);

  const [menu, setMenu] = useState(myBooks);

  const [user, setUser] = useState();

  const { id } = match.params;

  useEffect(() => {
    (async () => {
      const data = await fetchData(ROUTES.USER_CLIENT(id), setLoading);
      setUser(data);
    })();
  }, [id]);
  return (
    <>
      <UserInformation>
        {loading && <Loading />}
        {!loading && (
          <>
            <ProfileImageWrapper>
              <ProfileImage src={user && user.image} />
            </ProfileImageWrapper>
            <UserTextContainer>
              <UserName>{`${user && user.name.first} ${user && user.name.last}`}</UserName>
              <UserDescription>{user && user.desc}</UserDescription>
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
          </>
        )}
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
        {menu === myBooks && <ProfileCookBooks id={id} />}
        {menu === myRecipes && <ProfileRecipes id={id} />}
        {menu === settings && <Settings />}
      </DataContainer>
    </>
  );
};
ProfileComponent.propTypes = {
  match: PropTypes.any,
};
export default withRouter(ProfileComponent);
