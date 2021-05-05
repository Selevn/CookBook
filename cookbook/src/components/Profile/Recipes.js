import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback } from 'react/cjs/react.production.min';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';
import { Recipe } from '../MultyUsed/Recipe';

export const ProfileRecipes = (id) => {
  const [recipes, setRecipes] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(() => {
    (async () => {
      const data = await fetchData(`/api/users/recipes/${id}`, setLoading);
      setRecipes(data.docs);
    })();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {!loading && recipes && recipes.length === 0 ? (
        <h1>Person have no recipes</h1>
      ) : (
        <InfiniteScroll dataLength={recipes.length} hasMore loader={<Loading />} next={fetchRecipes}>
          {recipes && recipes.map((item) => <Recipe key={item._id} {...item} />)}
        </InfiniteScroll>
      )}
    </>
  );
};

ProfileRecipes.propTypes = {
  id: PropTypes.number,
};
