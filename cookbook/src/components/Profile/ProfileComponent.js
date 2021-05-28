import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../common/StylesComponent';
import {
  AddLink,
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
  AddButton,
} from './style/ProfileComponentStyle';
import { Settings } from '../Settings';
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES } from '../../constants';
import { ProfileCookBooks } from './CookBooks';
import { ProfileRecipes } from './Recipes';
import { Loading } from '../MultyUsed/Loading/Loading';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';
import { profileActions } from '../../Redux/Profile';

const ProfileComponent = ({ match }) => {
  const myBooks = 'myBooks';
  const myRecipes = 'myRecipes';
  const myLikedRecipes = 'myLikedRecipes';
  const myLikedBooks = 'myLikedBooks';
  const settings = 'settings';
  const { profile, auth } = useReduxState();
  const [loading, setLoading] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [menu, setMenu] = useState(myBooks);
  const [user, setUser] = useState();
  const { id } = match.params;

  const imageRef = useRef();

  const dispatcher = useDispatch();
  useEffect(() => {
    (async () => {
      if (Number(id) === profile?._id) setUser(profile);
      else {
        const data = await fetchData(ROUTES.USER_CLIENT(id), setLoading);
        setUser(data[0]);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (auth && user?._id === profile?._id) dispatcher(profileActions.setProfile(user));
  }, [user]);

  const SettingsWithRef = React.forwardRef((props, ref) => (
    <Settings imageRef={ref} setUser={props.setUser} />
  ));

  return (
    <>
      <UserInformation>
        {loading && <Loading />}
        {!loading && (
          <>
            <ProfileImageWrapper>
              <ProfileImage ref={imageRef} src={user?.image} />
            </ProfileImageWrapper>
            <UserTextContainer>
              <UserName>{`${user?.name?.first} ${user?.name?.last}`}</UserName>
              <UserDescription>{user?.desc}</UserDescription>
            </UserTextContainer>
            <AddContainer>
              {profile?._id === Number(id) && (
                <>
                  <AddButton
                    onClick={() => {
                      setAddMenu((s) => !s);
                    }}
                  >
                    Add New CookBook
                  </AddButton>
                  {addMenu && (
                    <>
                      <AddLink to="/newCookBook" secondary>
                        Add New CookBook
                      </AddLink>
                      <AddLink to="/newRecipe" secondary>
                        Add New Reciept
                      </AddLink>
                    </>
                  )}
                </>
              )}
            </AddContainer>
          </>
        )}
      </UserInformation>
      <Container>
        <LinksContainer>
          <UserLinks className={menu === myBooks ? 'active' : ''} onClick={() => setMenu(myBooks)}>
            {profile?._id === Number(id) && 'My'} CookBooks
          </UserLinks>
          <UserLinks
            className={menu === myRecipes ? 'active' : ''}
            onClick={() => setMenu(myRecipes)}
          >
            {profile?._id === Number(id) && 'My'} Recepies
          </UserLinks>
          {profile?._id === Number(id) && (
            <>
              <UserLinks
                className={menu === myLikedBooks ? 'active' : ''}
                onClick={() => setMenu(myLikedBooks)}
              >
                {profile?._id === Number(id) && 'My'} Liked CookBooks
              </UserLinks>
              <UserLinks
                className={menu === myLikedRecipes ? 'active' : ''}
                onClick={() => setMenu(myLikedRecipes)}
              >
                {profile?._id === Number(id) && 'My'} Liked Recepies
              </UserLinks>
            </>
          )}
          {profile?._id === Number(id) && (
            <UserLinks
              className={menu === settings ? 'active' : ''}
              onClick={() => setMenu(settings)}
            >
              My Settings
            </UserLinks>
          )}
        </LinksContainer>
      </Container>
      <DataContainer>
        {menu === myBooks && <ProfileCookBooks canEdit={profile?._id === Number(id)} id={id} />}
        {menu === myRecipes && <ProfileRecipes canEdit={profile?._id === Number(id)} id={id} />}
        {menu === myLikedBooks && <ProfileCookBooks canEdit={false} id={id} isLiked />}
        {menu === myLikedRecipes && <ProfileRecipes canEdit={false} id={id} isLiked />}
        {menu === settings && <SettingsWithRef setUser={setUser} ref={imageRef} />}
      </DataContainer>
    </>
  );
};

ProfileComponent.propTypes = {
  match: PropTypes.any,
};
export default withRouter(ProfileComponent);
