import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import {fetchData} from "../../Connectors/dataProvider";
import {ROUTES} from "../../constants";
import {CreateRecepie} from "../CreateRecepie";

const EditRecipe = () => {
  const { search } = useLocation()
  const values = queryString.parse(search)
  const [recipe, setRecipe] = useState()
  useEffect(()=>{
    (async ()=>{
      setRecipe((await fetchData(ROUTES.RECIPE_CLIENT(values.id)))[0])
    })()
  },[])

  return (
    <>
      {recipe && <CreateRecepie edit={recipe}/>}
    </>
  );
};

export default EditRecipe;
