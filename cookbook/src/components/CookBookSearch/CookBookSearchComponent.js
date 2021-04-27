import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  FilterContainer,
  HeaderContainer,
  InputUniteContainer,
  ResultCardsContainer,
  ResultsContainer,
  SearchMainComponent,
  SortContainer,
} from './style/CookBookSearchComponentStyle';
import { LinksContainer, UserLinks } from '../Profile/style/ProfileComponentStyle';
import { H1Styled, LabelStyled, LinkStyled } from '../common/StylesComponent';
import { CookCard } from '../MultyUsed/CookCard';
import { Recipe } from '../MultyUsed/Recipe';
import Checkbox from '../MultyUsed/CheckBox/CheckBox';

const SearchComponent = ({ match }) => {
  const cookbooks = 'cookbooks';
  const recipes = 'recipes';
  const vegeterianConst = 'vegeterian';
  const noMilkConst = 'noMilk';
  const noEggsConst = 'noEggs';

  const type = match.params.type;
  const [menu, setMenu] = useState(type === 'cookbooks' ? cookbooks : recipes);
  useEffect(() => {
    setMenu(type === 'cookbooks' ? cookbooks : recipes);
  }, [match.params.type]);

  const [foodPref, setFoodPref] = useState({
    vegeterian: false,
    noMilkConst: false,
    noEggsConst: false,
  });
  const handleCheckboxReducer = useCallback((name) => {
    setFoodPref((s) => ({ ...s, [name]: !s[name] }));
  }, []);

  const [hideMy, setHideMy] = useState(false);

  return (
    <SearchMainComponent>
      <FilterContainer>
        <HeaderContainer alignItems="baseline">
          <H1Styled>Filter</H1Styled>
          <LinkStyled>clear all</LinkStyled>
        </HeaderContainer>
        <SortContainer>
          <H1Styled>Sort by</H1Styled>
          <select>
            <option>Popularity</option>
            <option>Newest</option>
            <option>Most liked</option>
          </select>
        </SortContainer>
        {menu === cookbooks ? (
          <>
            <SortContainer>
              <H1Styled>Cookbook type</H1Styled>
              <InputUniteContainer>
                <LabelStyled
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheckboxReducer(vegeterianConst);
                  }}
                >
                  <Checkbox
                    type="checkbox"
                    id="vegeterian"
                    name="vegeterian"
                    value="vegeterian"
                    class="custom-checkbox"
                    checked={foodPref.vegeterian}
                  />
                  Vegeterian
                </LabelStyled>
              </InputUniteContainer>

              <InputUniteContainer>
                <LabelStyled
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheckboxReducer(noEggsConst);
                  }}
                >
                  <Checkbox
                    type="checkbox"
                    id="noEggs"
                    name="noEggs"
                    value="noEggs"
                    class="custom-checkbox"
                    checked={foodPref.noEggs}
                  />
                  Without eggs
                </LabelStyled>
              </InputUniteContainer>

              <InputUniteContainer>
                <LabelStyled
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheckboxReducer(noMilkConst);
                  }}
                >
                  <Checkbox
                    type="checkbox"
                    id="hideMy"
                    name="hideMy"
                    value="hideMy"
                    class="custom-checkbox"
                    checked={foodPref.noMilk}
                  />
                  Without milk
                </LabelStyled>
              </InputUniteContainer>
            </SortContainer>
          </>
        ) : (
          <>
            <SortContainer>
              <H1Styled>Cooking time</H1Styled>
              <select>
                <option>All</option>
                <option>&#60;20 min</option>
                <option>20 min - 40 min</option>
                <option>40 min - 1 hour</option>
                <option>1 hour - 2 hours</option>
                <option>2 hours - 3 hours</option>
                <option>&#62;3 hours</option>
              </select>
            </SortContainer>
          </>
        )}

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
        <ResultCardsContainer>
          {menu === cookbooks && (
            <>
              <CookCard type="normal" />
              <CookCard type="normal" />
              <CookCard type="normal" />
              <CookCard type="normal" />
              <CookCard type="normal" />
              <CookCard type="normal" />
            </>
          )}
          {menu === recipes && (
            <>
              <Recipe />
              <Recipe />
              <Recipe />
              <Recipe />
              <Recipe />
              <Recipe />
            </>
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
