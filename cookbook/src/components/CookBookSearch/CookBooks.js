import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PropTypes } from 'prop-types';
import { ROUTES } from '../../constants';
import { CookCard } from '../MultyUsed/CookCard';
import { InputUniteContainer, SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled, LabelStyled } from '../common/StylesComponent';
import Checkbox from '../MultyUsed/CheckBox/CheckBox';
import { Loading } from '../MultyUsed/Loading/Loading';
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import useDebounce from "../MultyUsed/CustomHooks/useDebouncer";
export const CookBooks = ({ filters, sortBy, searchValue }) => {

  const [items, setItems] = useState([]);

  const debouncedValue = useDebounce(searchValue, 500)

  const [fetchBooks, hasNext, loading] = useFetch(ROUTES.COOKBOOKS, setItems,{ ...filters, sortBy, searchString:debouncedValue })

  useEffect(() => {
    fetchBooks('start');
  }, [sortBy, filters, debouncedValue]);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasNext}
        loader={<Loading />}
        next={fetchBooks}
        className="infinity-scroller"
      >
        {items && items.map((item) => <CookCard key={item._id} {...item} />)}
        {!loading && items?.length === 0 && (<h1>No cookbooks</h1>)}
        {!items && loading && <Loading />}
      </InfiniteScroll>
    </>
  );
};

CookBooks.propTypes = {
  filters: PropTypes.object,
  sortBy: PropTypes.string,
};

export const CookBooksMenu = ({ foodPref, setFoodPref, stateChanged }) => {
  const vegeterianConst = 'vegeterian';
  const noMilkConst = 'noMilk';
  const noEggsConst = 'noEggs';

  const handleCheckboxReducer = useCallback((name) => {
    setFoodPref((s) => ({ ...s, [name]: !s[name] }));
    stateChanged(s=>!s)
  }, []);

  return (
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
  );
};

CookBooksMenu.propTypes = {
  foodPref: PropTypes.shape({
    vegeterian: PropTypes.bool,
    noMilk: PropTypes.bool,
    noEggs: PropTypes.bool,
  }),
  setFoodPref: PropTypes.func,
  sortBy: PropTypes.string,
};
