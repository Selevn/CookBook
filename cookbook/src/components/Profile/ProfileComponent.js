import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container} from '../common/StylesComponent';
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
import {Settings} from '../Settings';
import {fetchData} from '../../Connectors/dataProvider';
import {ROUTES} from '../../constants';
import {ProfileCookBooks} from './CookBooks';
import {ProfileRecipes} from './Recipes';
import {Loading} from '../MultyUsed/Loading/Loading';
import {useDispatch, useSelector} from "react-redux";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {profileActions} from "../../Redux/Profile";

const ProfileComponent = ({match}) => {
    const myBooks = 'myBooks';
    const myRecipes = 'myRecipes';
    const myLikedRecipes = 'myLikedRecipes';
    const myLikedBooks = 'myLikedBooks';
    const settings = 'settings';
    const {profile} = useReduxState();
    const [loading, setLoading] = useState(false);
    const [addMenu, setAddMenu] = useState(false);
    const [menu, setMenu] = useState(myBooks);
    const [user, setUser] = useState();
    const {id} = match.params;
    console.log(profile)
    console.log(id)

    const dispatcher = useDispatch()
    useEffect(() => {
        (async () => {
            if(Number(id) === profile?._id)
                setUser(profile)
            else{
                const data = await fetchData(ROUTES.USER_CLIENT(id), setLoading);
                setUser(data[0]);
            }
        })();
    }, [id]);




    return (
        <>
            <UserInformation>
                {loading && <Loading/>}
                {!loading && (
                    <>
                        <ProfileImageWrapper>
                            <ProfileImage src={user?.image}/>
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
                                            <AddButton href="/newCookBook" secondary>
                                                Add New CookBook
                                            </AddButton>
                                            <AddButton href="/newRecipe" secondary>
                                                Add New Reciept
                                            </AddButton>
                                        </>
                                    )}
                                </>)}
                        </AddContainer>
                    </>
                )}
            </UserInformation>
            <Container>
                <LinksContainer>
                    <UserLinks className={menu === myBooks ? 'active' : ''} onClick={() => setMenu(myBooks)}>
                        {profile?._id === Number(id) && `My`} CookBooks
                    </UserLinks>
                    <UserLinks
                        className={menu === myRecipes ? 'active' : ''}
                        onClick={() => setMenu(myRecipes)}
                    >
                        {profile?._id === Number(id) && `My`} Recepies
                    </UserLinks>
                    <UserLinks className={menu === myLikedBooks ? 'active' : ''} onClick={() => setMenu(myLikedBooks)}>
                        {profile?._id === Number(id) && `My`} Liked CookBooks
                    </UserLinks>
                    <UserLinks
                        className={menu === myLikedRecipes ? 'active' : ''}
                        onClick={() => setMenu(myLikedRecipes)}
                    >
                        {profile?._id === Number(id) && `My`} Liked Recepies
                    </UserLinks>
                    {profile?._id === Number(id) &&
                    (<UserLinks
                        className={menu === settings ? 'active' : ''}
                        onClick={() => setMenu(settings)}
                    >
                        My Settings
                    </UserLinks>)}

                </LinksContainer>
            </Container>
            <DataContainer>
                {menu === myBooks && <ProfileCookBooks id={id}/>}
                {menu === myRecipes && <ProfileRecipes id={id}/>}
                {menu === myLikedBooks && <ProfileCookBooks id={id} isLiked={true}/>}
                {menu === myLikedRecipes && <ProfileRecipes id={id} isLiked={true}/>}
                {menu === settings && <Settings setUser={setUser}/>}
            </DataContainer>
        </>
    );
}

ProfileComponent.propTypes = {
    match: PropTypes.any,
};
export default withRouter(ProfileComponent);
