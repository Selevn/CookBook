import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {
    CookBookContainer,
    Description,
    InfoContainer,
    ItemContainer,
    RecipeStats,
    RecipeStatsContainer,
} from './style/ItemPageComponentStyle';
import {
    H1Styled,
    LinkStyled,
    ParagraphStyled,
} from '../common/StylesComponent';
import {Statistics, StatisticsContainer} from '../MultyUsed/Recipe/style/RecipeContainerStyle';
import {Liked} from '../MultyUsed/Liked';
import {Commented} from '../MultyUsed/Commented';
import {Views} from '../MultyUsed/Views';
import {fetchData, SendData} from '../../Connectors/dataProvider';
import {COMMON, ROUTES} from '../../constants';
import {Loading} from '../MultyUsed/Loading/Loading';
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {useDispatch} from "react-redux";
import {profileActions} from "../../Redux/Profile";
import Recipes from "./RecipeContainer";
import ItemCommentsContainer from "./Comments";
import Slider from "./Slider";

const ItemPageComponent = ({match}) => {
    const {profile, auth} = useReduxState();
    const dispatcher = useDispatch();

    let {id, type} = match.params;
    if(type ==='cookbook')
        type = COMMON.COOKBOOK
    else
        type = COMMON.RECIPE

    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const isCommented = false;
    const [item, setItem] = useState(false);

    useEffect(() => {
        console.log(item)
        if (profile) {
            if (type === COMMON.COOKBOOK)
                setIsLiked(profile?.likes?.cookBooks?.includes(Number(id)))
            else
                setIsLiked(profile?.likes?.recipes?.includes(Number(id)))
        }
    }, [profile, id])

    useEffect(() => {
        (async () => {
            if (type === COMMON.COOKBOOK) {
                const data = await fetchData(ROUTES.COOKBOOK_CLIENT(id), setLoading);
                setItem(data[0]);
            } else {
                const data = await fetchData(ROUTES.RECIPE_CLIENT(id), setLoading);
                setItem(data[0]);
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
        if (type === COMMON.COOKBOOK)
            dispatcher(profileActions.likeCookbook(Number(id)))
        else
            dispatcher(profileActions.likeRecipe(Number(id)))
    }, [id, profile])

    const doLike = useCallback(() => {
        (async () => {
            let url;
            if (type === COMMON.COOKBOOK)
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
                                doLocalLike(-1)
                        })
                }
            }
        })()
    }, [id, type, isLiked, profile, auth])

    return (
        <ItemContainer>
            {loading && <Loading/>}
            {!loading && (
                <CookBookContainer>
                    <H1Styled size="56px">{item?.name}</H1Styled>
                    <LinkStyled to={`/profile/${item?.author?.[0]._id}`}>
                        {`${item?.author?.[0].name.first} ${item?.author?.[0].name.last}`}
                    </LinkStyled>
                    <InfoContainer>
                        {item?.image &&<Slider mainImage={item.image} inputImagesArray={type===COMMON.COOKBOOK?[]:item.images}/>}
                        <Description>
                            <H1Styled>Description</H1Styled>
                            <ParagraphStyled>{item?.desc}</ParagraphStyled>
                        </Description>
                    </InfoContainer>
                    {type === COMMON.RECIPE && (
                        <>
                            <RecipeStatsContainer>
                                <RecipeStats>
                                    <H1Styled>Directions</H1Styled>
                                    <ol>
                                        {

                                            item?.directions && item.directions.map((i, index) => (
                                            <li key={`${index}directions`}>
                                                <span>{i}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </RecipeStats>
                                <RecipeStats>
                                    <H1Styled>Ingredients</H1Styled>
                                    <ul>
                                        {
                                        item?.ingredients && item.ingredients.map((i, index) => (
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
                            <Liked count={(item?.likes) || 0} isLiked={isLiked} doLike={doLike}/>
                            <Commented count={(item?.commentsIds?.length) || 0} isCommented={isCommented}/>
                            <Views count={(item?.views) || 0}/>
                        </Statistics>
                    </StatisticsContainer>
                </CookBookContainer>
            )}
            {type === COMMON.COOKBOOK && (
                <>
                    <Recipes id={Number(id)}/>
                </>
            )}
            <ItemCommentsContainer id={Number(id)} type ={type} profile={profile} auth={auth} />
        </ItemContainer>
    );
}

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
