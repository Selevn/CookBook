import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled, Container, H1Styled } from '../common/StylesComponent';
import { Loading } from '../MultyUsed/Loading/Loading';
import { Recipe } from '../MultyUsed/Recipe';
import { RecepiesContainer } from './style/ItemPageComponentStyle';
import { useFetch } from '../MultyUsed/CustomHooks/useFetch';
import { ROUTES } from '../../constants';

const Recipes = ({ id }) => {
  const [recipes, setRecipes] = useState([]);
  const [fetchBooks, hasNext, loading] = useFetch(ROUTES.RECIPES, setRecipes, { cookbookId: id });
  // firstLoad
  useEffect(() => {
    fetchBooks();
  }, [id]);

  return (
    <RecepiesContainer>
      <H1Styled>Recepies</H1Styled>
      <Container className="recipesContainer">
        {recipes && recipes.map((i) => <Recipe key={`${i._id}recipe`} {...i} />)}
        {loading && <Loading />}
        {hasNext && (
          <ButtonStyled
            disabled={loading}
            onClick={() => {
              fetchBooks();
            }}
            secondary
            light
          >
            Load more
          </ButtonStyled>
        )}
      </Container>
    </RecepiesContainer>
  );
};

export default Recipes;

Recipes.propTypes = {
  id: PropTypes.number,
};
