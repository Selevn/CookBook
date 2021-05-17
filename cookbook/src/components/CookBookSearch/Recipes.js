import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Recipe } from '../MultyUsed/Recipe';
import { COMMON, ROUTES } from '../../constants';
import { SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled } from '../common/StylesComponent';
import { Loading } from '../MultyUsed/Loading/Loading';
import { InfinityScrolls } from '../MultyUsed/InfiniteScroll';
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";

export const Recipes = ({ filters, sortBy }) => {
  const [items, setItems] = useState([]);
  const [fetchRecipes, hasNext, loader] = useFetch(ROUTES.RECIPES, setItems, { cookTime: filters, sortBy })
  // firstLoad
  useEffect(() => {
    fetchRecipes();
  }, [sortBy, filters]);

  return (
    <>
      {/*<InfinityScroll/>*/}
      <InfinityScrolls
        dataLength={items.length}
        hasMore={hasNext}
        loader={<Loading />}
        next={fetchRecipes}

        className="infinity-scroller"
      >
        {loader && <Loading />}
        {items?.map((item) => <Recipe key={item._id} {...item} />)}
        {!loader && items?.length === 0 && (<h1>No recipes</h1>)}
      </InfinityScrolls>
    </>
  );
};

Recipes.propTypes = {
  filters: PropTypes.string,
  sortBy: PropTypes.string,
};

export const RecipesMenu = ({ cookTime, setCookTime }) => {
  return (
    <>
      <SortContainer>
        <H1Styled>Cooking time</H1Styled>
        <select value={cookTime} onChange={(e) => setCookTime(e.target.value)}>
          <option value={COMMON.ALLCONSTANT}>All</option>
          <option value="20">&#60;20 min</option>
          <option value="40">20 min - 40 min</option>
          <option value="60">40 min - 1 hour</option>
          <option value="120">1 hour - 2 hours</option>
          <option value="180">2 hours - 3 hours</option>
          <option value="240">&#62;3 hours</option>
        </select>
      </SortContainer>
    </>
  );
};

RecipesMenu.propTypes = {
  cookTime: PropTypes.string,
  setCookTime: PropTypes.func,
};
