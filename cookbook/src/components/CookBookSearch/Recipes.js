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
import {CookCard} from "../MultyUsed/CookCard";


function InfinityScroll(props) {
  return null;
}

InfinityScroll.propTypes = {
  hasMore: PropTypes.any,
  loader: PropTypes.element,
  dataLength: PropTypes.number,
  next: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};
export const Recipes = ({ filters, sortBy }) => {
  const [items, setItems] = useState([]);
  const [fetchRecipes, hasNext, loader] = useFetch(ROUTES.RECIPES, setItems, { ...filters, sortBy })
  // firstLoad
  useEffect(() => {
    fetchRecipes('start');
  }, [sortBy, filters]);

  return(
      <>
        <InfiniteScroll
            dataLength={items.length}
            hasMore={hasNext}
            loader={<Loading />}
            next={fetchRecipes}
            className="infinity-scroller"
        >
          {items && items.map((item) => <Recipe key={item._id} {...item} />)}
          {!loader && items?.length === 0 && (<h1>No recipes</h1>)}
          {loader && <Loading />}
        </InfiniteScroll>
      </>
  )
};

Recipes.propTypes = {
  filters: PropTypes.string,
  sortBy: PropTypes.string,
};

export const RecipesMenu = ({ cookTime, setCookTime, isAllAvailible = true }) => {
  return (
    <>
      <SortContainer>
        <H1Styled>Cooking time</H1Styled>
        <select value={cookTime} onChange={(e) => setCookTime(e.target.value)}>
          {isAllAvailible && <option value={COMMON.ALLCONSTANT}>All</option>}
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
