import React, {useEffect, useState} from 'react';
import {CreateCookBook} from "../CreateCookBook";
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import {fetchData} from "../../Connectors/dataProvider";
import {ROUTES} from "../../constants";

const EditCookBook = () => {
  const { search } = useLocation()
  const values = queryString.parse(search)
  const [cookBook, setCookBook] = useState({})
  useEffect(()=>{
    (async ()=>{
      setCookBook((await fetchData(ROUTES.COOKBOOK_CLIENT(values.id)))[0])
    })()
  },[])

  return (
    <>
      <CreateCookBook isEdit = {true} item={cookBook}/>
    </>
  );
};

export default EditCookBook;
