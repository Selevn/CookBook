import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Loading} from '../MultyUsed/Loading/Loading';
import {Recipe} from '../MultyUsed/Recipe';
import {ROUTES} from "../../constants";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";

export const ProfileRecipes = ({id, isLiked}) => {
    const [items, setItems] = useState([]);
    let fetchUrl;
    if (isLiked)
        fetchUrl = ROUTES.USER_CLIENT_LIKED_RECIPES(id)
    else
        fetchUrl = ROUTES.USER_CLIENT_RECIPES(id)


    const [fetchRecipes, hasNext, loader] = useFetch(fetchUrl, setItems)

    // firstLoad
    useEffect(() => {
        (async () => {
            await fetchRecipes('start');
        })()
    }, [id]);

    return (
        <>
            <InfiniteScroll
                dataLength={items.length}
                hasMore={hasNext && items.length !== 0}
                loader={<Loading/>}
                next={fetchRecipes}
                className="infinity-scroller"
            >
                {loader && <Loading/>}
                {!loader && items?.map((item) => <Recipe editable={!isLiked} key={item._id} {...item} />)}
                {!loader && items?.length === 0 && (<h1>No recipes</h1>)}
            </InfiniteScroll>
        </>
    );
};

ProfileRecipes.propTypes = {
    id: PropTypes.number,
};
