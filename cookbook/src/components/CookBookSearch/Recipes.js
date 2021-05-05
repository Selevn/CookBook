import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Recipe } from '../MultyUsed/Recipe';
import { fetchData } from '../../Connectors/dataProvider';
import { COMMON, ROUTES } from '../../constants';
import { SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled } from '../common/StylesComponent';
import { Loading } from '../MultyUsed/Loading/Loading';
import { InfinityScroll } from '../MultyUsed/InfiniteScroll';

export const Recipes = ({ filters, sortBy }) => {
  const paginatorInitState = { nextPage: 1, hasNextPage: true };

  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [paginator, setPaginator] = useState(paginatorInitState);

  const ItemsSetter = useCallback(
    (_items) => {
      setItems(items.concat(_items));
    }, [items],
  );

  const fetchRecipes = useCallback(() => {
    (async () => {

      const data = await fetchData(
        ROUTES.RECIPES, () => {}, { cookTime: filters, sortBy, page: paginator.nextPage },
      );
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      ItemsSetter(data.docs);
    })();
  }, [sortBy, filters, paginator.nextPage, items]);

  // firstLoad
  useEffect(() => {
    (async() => {
      setLoader(true);
      setItems([]);
      const data = await fetchData(ROUTES.RECIPES, () => {
      }, { cookTime: filters, sortBy, page: 1 });
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      setItems(data.docs);
      setLoader(false);
    })();
  }, [sortBy, filters]);

  return (
    <>
      {/*<InfinityScroll/>*/}
      <InfinityScroll
        dataLength={items.length}
        hasMore={paginator.hasNextPage}
        loader={<Loading />}
        next={fetchRecipes}
        className="infinity-scroller"
      >
        {loader && <Loading />}
        {!loader && items && items.map((item) => <Recipe key={item._id} {...item} />)}
        {!loader && items && items.length === 0 && (<h1>No recipes</h1>)}
      </InfinityScroll>
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
