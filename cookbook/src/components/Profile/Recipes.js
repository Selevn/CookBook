import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';
import { Recipe } from '../MultyUsed/Recipe';
import {ROUTES} from "../../constants";
import {InfinityScrolls} from "../MultyUsed/InfiniteScroll";

export const ProfileRecipes = ({id}) => {
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
      if(paginator.hasNextPage){
        const data = await fetchData(
            ROUTES.USER_CLIENT_RECIPES(id), () => {}, { cookTime: filters, sortBy, page: paginator.nextPage },
        );
        console.log(data)
        setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
        ItemsSetter(data.docs);
      }
    })();
  }, [id, paginator.nextPage, items]);

  // firstLoad
  useEffect(() => {
    (async() => {
      setLoader(true);
      setItems([]);
      const data = await fetchData(ROUTES.USER_CLIENT_RECIPES(id), () => {
      }, { page: 1 });
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      setItems(data.docs);
      setLoader(false);
    })();
  }, [id]);

  return (
      <>
        {/*<InfinityScroll/>*/}
        <InfiniteScroll
            dataLength={items.length}
            hasMore={paginator.hasNextPage}
            loader={<Loading />}
            next={fetchRecipes}
            className="infinity-scroller"
        >
          {loader && <Loading />}
          {!loader && items && items.map((item) => <Recipe key={item._id} {...item} />)}
          {!loader && items && items.length === 0 && (<h1>No recipes</h1>)}
        </InfiniteScroll>
      </>
  );
};

ProfileRecipes.propTypes = {
  id: PropTypes.number,
};
