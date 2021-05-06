import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Loading} from '../MultyUsed/Loading/Loading';
import {Recipe} from '../MultyUsed/Recipe';
import {ROUTES} from "../../constants";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";

export const ProfileRecipes = ({id}) => {
    const [items, setItems] = useState([]);

    const [fetchRecipes, hasNextPage, loader] = useFetch(ROUTES.USER_CLIENT_RECIPES(id), setItems)

    // firstLoad
    useEffect(() => {
        fetchRecipes();
    }, [id]);

    return (
        <>
            <InfiniteScroll
                dataLength={items.length}
                hasMore={hasNextPage}
                loader={<Loading/>}
                next={fetchRecipes}
                className="infinity-scroller"
            >
                {loader && <Loading/>}
                {!loader && items && items.map((item) => <Recipe key={item._id} {...item} />)}
                {!loader && items && items.length === 0 && (<h1>No recipes</h1>)}
            </InfiniteScroll>
        </>
    );
};

ProfileRecipes.propTypes = {
    id: PropTypes.number,
};
