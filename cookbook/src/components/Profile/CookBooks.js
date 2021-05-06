import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import { CookCard } from '../MultyUsed/CookCard';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';
import {ROUTES} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";

export const ProfileCookBooks = ({id}) => {
  const paginatorInitState = { nextPage: 1, hasNextPage: true };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginator, setPaginator] = useState(paginatorInitState);

  const ItemsSetter = useCallback(
      (_items) => {
        setItems(items.concat(_items));
      }, [items],
  );

  const fetchBooks = useCallback(() => {
    (async () => {
      const data = await fetchData(
          ROUTES.USER_CLIENT_COOKBOOKS(id), () => {}, { page: paginator.nextPage },
      );
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      ItemsSetter(data.docs);
      console.log(data);
    })();
  }, [id, paginator.nextPage, items]);

  // firstLoad
  useEffect(() => {
    (async() => {
      console.log(ROUTES.USER_CLIENT_COOKBOOKS(id))
      setLoading(true);
      setItems([]);
      const data = await fetchData(ROUTES.USER_CLIENT_COOKBOOKS(id), () => {
      }, { page: 1 });
      setPaginator({ nextPage: data.nextPage, hasNextPage: data.hasNextPage });
      setItems(data.docs);
      setLoading(false);
    })();
  }, [id]);



  return (
    <>
      {/*{loading && <Loading />}
      {items && items.length === 0 ? (
        <h1>Person have no cookbooks</h1>
      ) : (
          items && items.map((item) => <CookCard key={item._id} type="normal" {...item} />)
      )}*/}
      <InfiniteScroll
          dataLength={items.length}
          hasMore={paginator.hasNextPage}
          loader={<Loading />}
          next={fetchBooks}
          className="infinity-scroller"
      >
        {loading && <Loading />}
        {!loading && items && items.map((item) => <CookCard type="normal" key={item._id} {...item} />)}
        {!loading && items && items.length === 0 && (<h1>No cookbooks</h1>)}
      </InfiniteScroll>
    </>
  );
};
ProfileCookBooks.propTypes = {
  id: PropTypes.number,
};
