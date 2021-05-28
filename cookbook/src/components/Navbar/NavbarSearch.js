import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '../MultyUsed/CustomHooks/useDebouncer';
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES } from '../../constants';
import { Recipes, Results, SearchStyled, CookBooks } from './style/SearchStyle';
import {
  H1Styled,
  LinkStyled,
  ParagraphStyled,
} from '../common/StylesComponent';
import { Recipe } from '../MultyUsed/Recipe';
import { CookCard } from '../MultyUsed/CookCard';
import { Loading } from '../MultyUsed/Loading/Loading';

const SearchBlock = () => {
  let timeOutRef = useRef();

  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [cookBooks, setCookBooks] = useState(null);
  const [recipesLoader, setRecipesLoader] = useState(false);
  const [cookBooksLoader, setCookBooksLoader] = useState(false);
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    (async () => {
      const arr = [];
      arr.push(fetchData(ROUTES.RECIPES, setRecipesLoader, { searchString: debouncedValue }));
      arr.push(fetchData(ROUTES.COOKBOOKS, setCookBooksLoader, { searchString: debouncedValue }));
      Promise.all(arr).then((values) => {
        const fetchedRecipes = values[0];
        const fetchedBooks = values[1];
        setRecipes(fetchedRecipes.docs.slice(0, 3));
        setCookBooks(fetchedBooks.docs.slice(0, 3));
      });
    })();
    return () => {
      setRecipes([]);
      setCookBooks([]);
    };
  }, [debouncedValue]);

  return (
    <>
      <SearchStyled
        placeholder="Fresh meat"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onBlur={() => {
          timeOutRef = setTimeout(() => {
            setSearch('');
            setRecipes([]);
            setCookBooks([]);
          }, 500);
        }}
        onFocus={() => {
          clearTimeout(timeOutRef.current);
        }}
      />
      {search !== '' && (
        <Results
          onClick={() => {
            setSearch('');
            setRecipes([]);
            setCookBooks([]);
          }}
        >
          <Recipes>
            <H1Styled>Recipes</H1Styled>
            {(recipesLoader || cookBooksLoader) && <Loading />}
            {!recipesLoader &&
              recipes &&
              recipes.map((item) => <Recipe small key={item._id} {...item} />)}
            {!recipesLoader && !cookBooksLoader && recipes.length === 0 && (
              <ParagraphStyled>No Recipes</ParagraphStyled>
            )}
          </Recipes>
          <CookBooks>
            <H1Styled>CookBooks</H1Styled>
            {(cookBooksLoader || recipesLoader) && <Loading />}
            {!cookBooksLoader &&
              cookBooks &&
              cookBooks.map((item) => <CookCard type="tiny" tiny key={item._id} {...item} />)}
            {!cookBooksLoader && !recipesLoader && cookBooks.length === 0 && (
              <ParagraphStyled>No cookbooks</ParagraphStyled>
            )}
          </CookBooks>
          <LinkStyled to={`/search/cookbooks?searchString=${search}`}>Show more</LinkStyled>
        </Results>
      )}
    </>
  );
};

export default SearchBlock;
