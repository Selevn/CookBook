import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PropTypes } from 'prop-types';
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES } from '../../constants';
import { CookCard } from '../MultyUsed/CookCard';
import { InputUniteContainer, SortContainer } from './style/CookBookSearchComponentStyle';
import { H1Styled, LabelStyled } from '../common/StylesComponent';
import Checkbox from '../MultyUsed/CheckBox/CheckBox';
import { searchSorter } from './sortFunction';
import { Loading } from '../MultyUsed/Loading/Loading';
import {Recipe} from "../MultyUsed/Recipe";

export const CookBooks = ({ filters, sortBy }) => {
  const paginatorInitState = { nextPage: 1, hasNextPage: true };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginator, setPaginator] = useState(paginatorInitState);


  const ItemsSetter = useCallback(
      (_items) => {
        setItems(items.concat(_items));
      }, [items],
  );

  useEffect(() => {
    (async () => {
      const data = await fetchData(ROUTES.COOKBOOKS, setLoading, filters);
      setItems(data.docs);
    })();
  }, [filters, sortBy]);

  const fetchBooks = useCallback(() => {
    (async () => {
      const data = await fetchData(
          ROUTES.COOKBOOKS, () => {}, { ...filters, sortBy, page: paginator.nextPage }
      );
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      ItemsSetter(data.docs);
    })();
  }, [sortBy, filters, paginator.nextPage, items]);

  //firstLoad
  useEffect(() => {
    (async() => {
      setLoading(true)
      setItems([]);
      const data = await fetchData(ROUTES.COOKBOOKS, () => {
      }, { ...filters, sortBy, page: 1 });
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      setItems(data.docs);
      setLoading(false)
    })();
  }, [sortBy, filters]);
  return (
    <>

        <InfiniteScroll
            dataLength={items.length}
            hasMore={paginator.hasNextPage}
            loader={<Loading />}
            next={fetchBooks}
        >
          {loading && <Loading/>}
          {!loading && items && items.map((item) => <CookCard key={item._id} {...item} />)}
          {!loading && items && items.length === 0 && (<h1>No cookbooks</h1>)}
        </InfiniteScroll>

    </>
  );
};

CookBooks.propTypes = {
  filters: PropTypes.object,
  sortBy: PropTypes.string,
};

export const CookBooksMenu = ({ foodPref, setFoodPref }) => {
  const vegeterianConst = 'vegeterian';
  const noMilkConst = 'noMilk';
  const noEggsConst = 'noEggs';

  const handleCheckboxReducer = useCallback((name) => {
    setFoodPref((s) => ({ ...s, [name]: !s[name] }));
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
