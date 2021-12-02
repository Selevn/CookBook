import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect, useLocation } from 'react-router-dom';
import { CreateCookBook } from '../CreateCookBook';
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES, STATE } from '../../constants';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';
import {toast} from "react-toastify";

const EditCookBook = () => {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const [cookBook, setCookBook] = useState({});
  const { profile, auth } = useReduxState();

  if (!profile || !auth) return <Redirect to="/" />;

  useEffect(() => {
    (async () => {
      const data = (await fetchData(ROUTES.COOKBOOK_CLIENT(values.id)))
      if(data === null){
        toast.error("Server is in troubles. Try in seconds")
        return;
      }
      const cookbook = data[0];
      if (cookbook.author[0]._id != profile._id) setCookBook(STATE.FAIL);
      else setCookBook(cookbook);
    })();
  }, []);

  return (
    <>
      {cookBook === STATE.FAIL && <Redirect to="/" />}
      {cookBook && <CreateCookBook isEdit item={cookBook} />}
    </>
  );
};

export default EditCookBook;
