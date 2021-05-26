import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import { CookCard } from '../MultyUsed/CookCard';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';
import {ROUTES} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";

export const ProfileCookBooks = ({id ,isLiked, canEdit}) => {
  const [items, setItems] = useState([]);
  let fetchUrl;
    if(isLiked)
        fetchUrl = ROUTES.USER_CLIENT_LIKED_COOKBOOKS(id)
    else
        fetchUrl = ROUTES.USER_CLIENT_COOKBOOKS(id)

  const [fetchBooks, hasNext, loading] = useFetch(fetchUrl, setItems )
  // firstLoad
  useEffect(() => {
      (async ()=>{
          await fetchBooks('start')
      })()
  }, [id]);

  return (
    <>
      <InfiniteScroll
          dataLength={items.length}
          hasMore={hasNext && items.length!==0}
          loader={<Loading />}
          next={fetchBooks}
          className="infinity-scroller"
      >
        {/*{loading && <Loading />}*/}
        {!loading && items?.map((item) => <CookCard isEditable={canEdit} type="normal" key={item._id} {...item} />)}
        {!loading && items?.length === 0 && (<h1>No cookbooks</h1>)}
      </InfiniteScroll>
    </>
  );
};
ProfileCookBooks.propTypes = {
  id: PropTypes.number,
};
