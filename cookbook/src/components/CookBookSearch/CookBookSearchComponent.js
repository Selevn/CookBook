import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import {
  FilterContainer,
  HeaderContainer,
  ResultCardsContainer,
  ResultsContainer,
  SearchMainComponent,
  SortContainer,
} from './style/CookBookSearchComponentStyle';
import { LinksContainer, UserLinks } from '../Profile/style/ProfileComponentStyle';
import { ButtonStyled, H1Styled, InputStyled, LabelStyled } from '../common/StylesComponent';
import Checkbox from '../MultyUsed/CheckBox/CheckBox';
import { Recipes, RecipesMenu } from './Recipes';
import { CookBooks, CookBooksMenu } from './CookBooks';
import { COMMON } from '../../constants';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';

const SearchComponent = ({ match }) => {
  const { search: searchValue } = useLocation();
  const values = queryString.parse(searchValue);

  const foodPrefInitialValue = {
    vegeterian: false,
    noMilk: false,
    noEggs: false,
  };

  const type = match.params.type;

  const { profile, auth } = useReduxState();

  const cookbooks = 'cookbooks';
  const recipes = 'recipes';

  const [menu, setMenu] = useState(type === 'cookbooks' ? cookbooks : recipes);
  useEffect(() => {
    setMenu(type === 'cookbooks' ? cookbooks : recipes);
  }, [type]);

  const [foodPref, setFoodPref] = useState(foodPrefInitialValue);

  const [hideMy, setHideMy] = useState(false);
  const [sort, setSort] = useState(COMMON.POPULAR);

  const [cookTime, setCookTime] = useState(COMMON.ALLCONSTANT);

  const clearFilters = useCallback(() => {
    setSort(COMMON.POPULAR);
    setCookTime(COMMON.ALLCONSTANT);
    setFoodPref(foodPrefInitialValue);
    setHideMy(false);
  }, []);

  const [recipeFilters, setRecipeFilters] = useState();
  useEffect(() => {
    setRecipeFilters({ cookTime, hideMy: hideMy && profile._id });
  }, [cookTime, hideMy, profile?._id]);

  const [cookBooksFilters, setCookBooksFilters] = useState();
  const [statechanged, setStateChanged] = useState();
  useEffect(() => {
    setCookBooksFilters({ ...foodPref, hideMy: hideMy && profile._id });
  }, [statechanged, hideMy, profile?._id]);

  const [search, setSearch] = useState(values.searchString || '');

  return (
    <SearchMainComponent>
      <FilterContainer>
        <HeaderContainer alignItems="baseline">
          <H1Styled>Filter</H1Styled>
          <ButtonStyled small light secondary onClick={clearFilters}>
            Clear all
          </ButtonStyled>
        </HeaderContainer>
        <SortContainer>
          <H1Styled>Sort by</H1Styled>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value={COMMON.POPULAR}>Popularity</option>
            <option value={COMMON.NEWEST}>Newest</option>
            <option value={COMMON.LIKED}>Most liked</option>
          </select>
        </SortContainer>
        {menu === cookbooks ? (
          <CookBooksMenu
            stateChanged={setStateChanged}
            setFoodPref={setFoodPref}
            foodPref={foodPref}
          />
        ) : (
          <RecipesMenu cookTime={cookTime} setCookTime={setCookTime} />
        )}

        {profile && (
          <LabelStyled
            onClick={(e) => {
              e.preventDefault();
              setHideMy((s) => !s);
            }}
            className="hideMy"
          >
            <Checkbox
              type="checkbox"
              id="noEggs"
              name="noEggs"
              value="noEggs"
              class="custom-checkbox"
              checked={hideMy}
            />
            Hide my {menu === recipes ? 'recipes' : 'cookbooks'}
          </LabelStyled>
        )}
      </FilterContainer>
      <ResultsContainer>
        <LinksContainer>
          <UserLinks
            className={menu === cookbooks ? 'active' : ''}
            onClick={() => setMenu(cookbooks)}
          >
            Cookbooks
          </UserLinks>
          <UserLinks className={menu === recipes ? 'active' : ''} onClick={() => setMenu(recipes)}>
            Recepies
          </UserLinks>
        </LinksContainer>

        <InputStyled
          placeholder="Fresh meat"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <ResultCardsContainer>
          {menu === cookbooks && (
            <CookBooks searchValue={search} filters={cookBooksFilters} sortBy={sort} />
          )}
          {menu === recipes && (
            <Recipes searchValue={search} filters={recipeFilters} sortBy={sort} />
          )}
        </ResultCardsContainer>
      </ResultsContainer>
    </SearchMainComponent>
  );
};
SearchComponent.propTypes = {
  match: PropTypes.object,
};

export default withRouter(SearchComponent);
