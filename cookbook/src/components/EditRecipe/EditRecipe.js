import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import {Redirect, useLocation} from 'react-router-dom'
import {fetchData} from "../../Connectors/dataProvider";
import {ROUTES, STATE} from "../../constants";
import {CreateRecepie} from "../CreateRecepie";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";

const EditRecipe = () => {
  const { search } = useLocation()
  const values = queryString.parse(search)
  const [recipe, setRecipe] = useState()

  const {profile, auth} = useReduxState()

  if(!auth || !profile)
    return <Redirect to={'/'}/>

  useEffect(()=>{
    (async ()=>{
      const recipe = (await fetchData(ROUTES.RECIPE_CLIENT(values.id)))[0]
      if(recipe.author[0]._id !== profile._id)
        setRecipe(STATE.FAIL)
      else
        setRecipe(recipe)
    })()
  },[])

  return (
    <>
      {recipe === STATE.FAIL && <Redirect to={'/'}/>}
      {recipe && <CreateRecepie edit={recipe}/>}
    </>
  );
};

export default EditRecipe;
