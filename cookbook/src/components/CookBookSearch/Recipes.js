import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Recipe } from '../MultyUsed/Recipe';
import { fetchData } from '../../Connectors/dataProvider';
import { COMMON, ROUTES } from '../../constants';
import { SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled } from '../common/StylesComponent';
import { searchSorter } from './sortFunction';
import { Loading } from '../MultyUsed/Loading/Loading';

export const Recipes = ({ filters, sortBy }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await fetchData(ROUTES.RECIPES, setLoading, { cookTime: filters });
      setItems(data);
    })();
  }, [filters, sortBy]);

  return (
    <>
      {loading && <Loading />}
      {items && items.sort(searchSorter(sortBy)).map((item) => <Recipe key={item._id} {...item} />)}
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
