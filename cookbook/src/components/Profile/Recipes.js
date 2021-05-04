import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';
import { Recipe } from '../MultyUsed/Recipe';

export const ProfileRecipes = (id) => {
  const [recipes, setRecipes] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await fetchData(`/api/users/recipes/${id}`, setLoading);
      setRecipes(data);
    })();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {recipes && recipes.length === 0 ? (
        <h1>Person have no recipes</h1>
      ) : (
        recipes && recipes.map((item) => <Recipe key={item._id} {...item} />)
      )}
    </>
  );
};

ProfileRecipes.propTypes = {
  id: PropTypes.number,
};
