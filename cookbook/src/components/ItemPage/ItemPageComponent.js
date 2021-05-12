import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Recipe} from '../MultyUsed/Recipe';
import {
    Comments,
    CommentsContainer,
    CookBookContainer,
    CreateComment,
    Description,
    InfoContainer,
    ItemContainer,
    ItemPageImageBook,
    RecepiesContainer,
    RecipeStats,
    RecipeStatsContainer,
} from './style/ItemPageComponentStyle';
import {
    ButtonStyled,
    Container,
    H1Styled,
    InputStyled,
    LinkStyled,
    ParagraphStyled,
} from '../common/StylesComponent';
import {Statistics, StatisticsContainer} from '../MultyUsed/Recipe/style/RecipeContainerStyle';
import {Comment} from '../MultyUsed/Comment';
import {Liked} from '../MultyUsed/Liked';
import {Commented} from '../MultyUsed/Commented';
import {Views} from '../MultyUsed/Views';
import {fetchData, SendData} from '../../Connectors/dataProvider';
import {ROUTES} from '../../constants';
import {Loading} from '../MultyUsed/Loading/Loading';
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {useDispatch} from "react-redux";
import {profileActions} from "../../Redux/Profile";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";

const ItemPageComponent = ({match}) => {
    const {profile, auth} = useReduxState();
    const dispatcher = useDispatch();

    const {id, type} = match.params;

    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const isCommented = false;
    const [item, setItem] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (profile) {
            if (type === 'cookbook')
                setIsLiked(profile.likes.cookBooks.includes(Number(id)))
            else
            {
                setIsLiked(profile.likes.recipes.includes(Number(id)))
            }
        }
    }, [profile])

    useEffect(() => {
        (async () => {
            if (type === 'cookbook') {
                const data = await fetchData(ROUTES.COOKBOOK_CLIENT(id), setLoading);
                setItem(data[0]);
                setRecipes(data[0].recipes);
                setComments(data[0].comments);
            } else {
                const data = await fetchData(ROUTES.RECIPE_CLIENT(id), setLoading);
                setItem(data[0]);
                setComments(data[0].comments);
            }
        })();
    }, [id, type]);

    const doLocalLike = useCallback((changeBy) => {
        if (changeBy === -1) {
            setIsLiked(false);
            setItem(s => ({...s, likes: s.likes - 1}));
        } else {
            setIsLiked(true);
            setItem(s => ({...s, likes: s.likes + 1}));
        }
        if (type === 'cookbook')
            dispatcher(profileActions.likeCookbook(Number(id)))
        else
            dispatcher(profileActions.likeRecipe(Number(id)))
    }, [])

    const doLike = useCallback(() => {
        (async () => {
            let url;
            if (type === 'cookbook')
                url = ROUTES.USER_LIKE_COOKBOOK
            else
                url = ROUTES.USER_LIKE_RECIPE
            if (profile && auth) {
                if (isLiked) {
                    doLocalLike(-1)
                    SendData(url, {from: profile._id, to: Number(id)}, auth)
                        .then(result => {
                            if (!result.success)
                                doLocalLike(-1)
                        })
                } else {
                    doLocalLike(1)
                    SendData(url, {from: profile._id, to: Number(id)}, auth)
                        .then(result => {
                            if (!result.success)
                                doLocalLike(+1)
                        })
                }
            }
        })()
    }, [id, type, isLiked, profile, auth])

    const [post, setPost] = useState("")
    const postLocalComment = useCallback((text) => {
        comments.unshift({author: [{name:profile.name, image: profile.image}], text: text, date:Date.now()})
        setComments([...comments])
    },[profile, comments])
    const postComment = useCallback(() => {
        if(profile)
        {
            postLocalComment(post);
        }
        else{
            alert("You shall be authrorized.")
        }
    },[id, type, profile, auth, post]);



    return (
        <ItemContainer>
            {loading && <Loading/>}
            {!loading && (
                <CookBookContainer>
                    <H1Styled size="56px">{item && item.name}</H1Styled>
                    <LinkStyled to={`/profile/${item && item.author[0]._id}`}>
                        {`${item && item.author[0].name.first} ${item && item.author[0].name.last}`}
                    </LinkStyled>
                    <InfoContainer>
                        <ItemPageImageBook src={(item && item.image) || ''}/>
                        <Description>
                            <H1Styled>Description</H1Styled>
                            <ParagraphStyled>{item && item.desc}</ParagraphStyled>
                        </Description>
                    </InfoContainer>
                    {type === 'recipe' && (
                        <>
                            <RecipeStatsContainer>
                                <RecipeStats>
                                    <H1Styled>Directions</H1Styled>
                                    <ol>
                                        {item &&
                                        item.directions &&
                                        item.directions.map((i, index) => (
                                            <li key={`${index}directions`}>
                                                <span>{i}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </RecipeStats>
                                <RecipeStats>
                                    <H1Styled>Ingredients</H1Styled>
                                    <ul>
                                        {item &&
                                        item.ingredients &&
                                        item.ingredients.map((i, index) => (
                                            <li key={`${index}ingredients`}>
                                                <span>{i}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </RecipeStats>
                            </RecipeStatsContainer>
                        </>
                    )}
                    <StatisticsContainer>
                        <Statistics>
                            <Liked count={(item && item.likes) || 0} isLiked={isLiked} doLike={doLike}/>
                            <Commented count={(item && item.commentsIds.length) || 0} isCommented={isCommented}/>
                            <Views count={(item && item.views) || 0}/>
                        </Statistics>

                    </StatisticsContainer>
                </CookBookContainer>
            )}
            {type === 'cookbook' && (
                <>
                    <RecepiesContainer>
                        <H1Styled>Recepies</H1Styled>
                        <Container className="recipesContainer">
                            {loading && <Loading/>}
                            {recipes && recipes.map((i) => <Recipe key={`${i._id}recipe`} {...i} />)}
                        </Container>
                    </RecepiesContainer>
                </>
            )}

            <CommentsContainer>
                <H1Styled>Comments ({item && item.commentsIds.length})</H1Styled>
                <CreateComment>
                    <InputStyled placeholder="Express yourself..." value ={post} onChange={(e)=>setPost(e.target.value)}/>
                    <ButtonStyled small onClick={postComment}>Post</ButtonStyled>
                </CreateComment>
                <Comments>
                    {loading && <Loading/>}
                    {comments && comments.map((i) => <Comment key={`${i._id}comment`} {...i} />)}
                </Comments>
            </CommentsContainer>
        </ItemContainer>
    );
};

ItemPageComponent.propTypes = {
    views: PropTypes.number,
    likes: PropTypes.array,
    comments: PropTypes.array,
    isLiked: PropTypes.bool,
    isCommented: PropTypes.bool,
    author: PropTypes.array,
    name: PropTypes.string,
    desc: PropTypes.string,

    match: PropTypes.object,
};
ItemPageComponent.defaultProps = {};

export default withRouter(ItemPageComponent);
