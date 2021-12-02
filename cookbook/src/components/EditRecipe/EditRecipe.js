import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect, useLocation } from 'react-router-dom';
import { fetchData } from '../../Connectors/dataProvider';
import { ROUTES, STATE } from '../../constants';
import { CreateRecepie } from '../CreateRecepie';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';
import {toast} from "react-toastify";

const EditRecipe = () => {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const [recipe, setRecipe] = useState();

  const { profile, auth } = useReduxState();

  if (!auth || !profile) return <Redirect to="/" />;

  useEffect(() => {
    (async () => {
      const data = (await fetchData(ROUTES.RECIPE_CLIENT(values.id)))
      if(data === null){
        toast.error("Server is in troubles. Try in seconds")
        return;
      }
      const localRecipe = data[0];

      if (localRecipe.author[0]._id != profile._id) setRecipe(STATE.FAIL);
      else setRecipe(localRecipe);
    })();
  }, []);

  return (
    <>
      {recipe === STATE.FAIL && <Redirect to="/" />}
      {recipe && <CreateRecepie edit={recipe} />}
    </>
  );
};

export default EditRecipe;
