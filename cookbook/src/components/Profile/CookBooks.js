import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CookCard } from '../MultyUsed/CookCard';
import { fetchData } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';

export const ProfileCookBooks = (id) => {
  const [cookBooks, setCookBooks] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await fetchData(`/api/users/cookbooks/${id}`, setLoading);
      console.log(data.docs);
      setCookBooks(data.docs);
    })();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {cookBooks && cookBooks.length === 0 ? (
        <h1>Person have no cookbooks</h1>
      ) : (
        cookBooks && cookBooks.map((item) => <CookCard key={item._id} type="normal" {...item} />)
      )}
    </>
  );
};
ProfileCookBooks.propTypes = {
  id: PropTypes.number,
};
