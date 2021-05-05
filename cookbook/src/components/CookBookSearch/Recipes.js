import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Recipe } from '../MultyUsed/Recipe';
import { fetchData } from '../../Connectors/dataProvider';
import { COMMON, ROUTES } from '../../constants';
import { SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled } from '../common/StylesComponent';
import { searchSorter } from './sortFunction';
import { Loading } from '../MultyUsed/Loading/Loading';

export const Recipes = ({ filters, sortBy }) => {
  const paginatorInitState = { nextPage: 1, hasNextPage: true };

  const [items, setItems] = useState([]);
  const [paginator, setPaginator] = useState(paginatorInitState);

  const ItemsSetter = useCallback(
    (_items) => {
      if (_items) setItems(items.concat(_items));
      else setItems([]);
    }, [items],
  );

  const fetchRecipes = useCallback(() => {
    (async () => {
      console.log('paginator');
      const data = await fetchData(
          ROUTES.RECIPES, () => {}, { cookTime: filters, sortBy, page: paginator.nextPage }
      );
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      ItemsSetter(data.docs);
    })();
  }, [sortBy, filters, paginator.nextPage, items]);

  useEffect(() => {
    (async() => {
      console.log('initial');
      setItems([]);
      const data = await fetchData(ROUTES.RECIPES, () => {
      }, { cookTime: filters, sortBy, page: 1 });
      console.log(data);
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      setItems(data.docs);
    })();
  }, [sortBy, filters]);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        hasMore={paginator.hasNextPage}
        loader={<Loading />}
        next={fetchRecipes}
      >
        {items && items.map((item) => <Recipe key={item._id} {...item} />)}
      </InfiniteScroll>
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
