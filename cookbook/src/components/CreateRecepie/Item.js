import { AiOutlineClose } from 'react-icons/all';
import React, { useCallback } from 'react';
import { ParagraphStyled } from '../common/StylesComponent';
import { CloseIngredient, Ingredient } from './style/CreateRecepieComponentStyle';

const Item = ({ value, index, setRecipe, recipe, type }) => {
  const remove = useCallback(
    (e) => {
      e.preventDefault();
      recipe[type].splice(index, 1);
      setRecipe({ ...recipe });
    },
    [value, recipe, index],
  );

  return (
    <Ingredient>
      <ParagraphStyled>{value}</ParagraphStyled>
      <CloseIngredient onClick={remove}>
        <AiOutlineClose size="22px" />
      </CloseIngredient>
    </Ingredient>
  );
};

export default Item;
