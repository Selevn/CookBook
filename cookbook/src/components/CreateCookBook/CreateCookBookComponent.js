import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  Container,
  H1Styled,
  InputFeedback,
  InputStyled,
  LabelAsButton,
} from '../common/StylesComponent';

import { Recipe } from '../MultyUsed/Recipe';
import {
  ControllButtons,
  CreateCookBookPage,
  DescriptionInput,
  HeaderStyled,
  TitleContainer,
} from './style/CreateCookBookComponentStyle';
import { Loading } from '../MultyUsed/Loading/Loading';
import { useFetch } from '../MultyUsed/CustomHooks/useFetch';
import { COOKBOOK_FIELDS, MESSAGES, ROUTES, TOAST_SETTINGS } from '../../constants';
import useDebounce from '../MultyUsed/CustomHooks/useDebouncer';
import { fetchData, SendFile } from '../../Connectors/dataProvider';
import { useReduxState } from '../MultyUsed/CustomHooks/useReduxState';
import { CookBooksMenu } from '../CookBookSearch/CookBooks';
import { RecepiesContainer } from '../ItemPage/style/ItemPageComponentStyle';
import { ServerMessageHandler } from '../MultyUsed/ResponseSuccesHandler';
import { useLogout } from '../MultyUsed/CustomHooks/useLogout';
import { AuthCheckerWrapper } from '../../Connectors/AuthChecker';
import { validateTitle, validateDescription, validateImage } from '../../validator/validator';

const CreateCookBookComponent = ({ isEdit, item }) => {
  const { profile, auth } = useReduxState();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [foodPref, setFoodPref] = useState('');
  const [recipeSearch, setRecipeSearch] = useState('');
  const [recipesSelected, setRecipesSelected] = useState([]);
  const [recipesSelectedIds, setRecipesSelectedIds] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState();

  if (!profile || !auth) return <Redirect to="/" />;

  const fileChanges = (e) => {
    e.preventDefault();
    const _file = e.target.files[0];
    setFile(_file);
  };

  const removeSaved = useCallback((cbItem, saved) => {
    setRecipesSelected((s) => s.filter((recipe) => saved !== recipe));
    setRecipesSelectedIds((s) => s.filter((recipeId) => cbItem._id !== recipeId));
  }, []);

  const addSaved = useCallback((cbItem, saved) => {
    setRecipesSelected((s) => [...s, saved]);
    setRecipesSelectedIds((s) => [...s, cbItem._id]);
  }, []);

  const logOut = useLogout();
  useEffect(() => {
    const authCheck = AuthCheckerWrapper();
    if (!authCheck(auth)) {
      toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
      logOut();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (isEdit && item.recipesIds) {
        const recipesData = await fetchData(ROUTES.RECIPES, null, {
          ids: JSON.stringify(item.recipesIds),
        });
        recipesData.docs.forEach((recipeItem) => {
          const savedRecipe = (
            <Recipe
              removable
              onRemovable={() => {
                removeSaved(recipeItem, savedRecipe);
              }}
              key={recipeItem._id}
              {...recipeItem}
            />
          );
          addSaved(recipeItem, savedRecipe);
        });
        setTitle(item.name);
        setDesc(item.desc);
        const filters = {};
        item.filters.forEach((filterItem) => {
          filters[filterItem] = true;
        });
        setFoodPref(filters);
      }
    })();
  }, [isEdit, item]);

  const save = async (values) => {
    const filtersNormalized = [];
    /* eslint-disable-next-line */
    for (const filter in foodPref) foodPref[filter] && filtersNormalized.push(filter);

    if (!auth) {
      toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
      return;
    }
    if (!file && !isEdit) {
      toast.error(MESSAGES.ERROR.NO_FILE_CHOSEN, TOAST_SETTINGS);
      return;
    }

    const formData = new FormData();

    if (!file && isEdit) formData.append(COOKBOOK_FIELDS.image, item.image);
    else if (validateImage(file)) formData.append('image', file);
    else {
      toast.error('Invalid image format!', TOAST_SETTINGS);
      return;
    }
    if (isEdit) {
      formData.append(COOKBOOK_FIELDS.ID, item._id);
    }

    formData.append(COOKBOOK_FIELDS.author, profile._id);
    formData.append(COOKBOOK_FIELDS.name, values.title);
    formData.append(COOKBOOK_FIELDS.desc, values.desc);
    formData.append(COOKBOOK_FIELDS.recipesIds, JSON.stringify(recipesSelectedIds));
    formData.append(COOKBOOK_FIELDS.creationDate, Date.now());

    formData.append(COOKBOOK_FIELDS.filters, JSON.stringify(filtersNormalized));

    SendFile(isEdit ? ROUTES.EDIT_COOKBOOK : ROUTES.NEW_COOKBOOK, formData, auth, logOut).then(
      (response) => {
        ServerMessageHandler(
          response,
          () => {
            isEdit && history.push(`/info/cookbook/${item._id}`);
            !isEdit && history.push(`/info/cookbook/${response.id}`);
          },
          null,
        );
      },
    );
  };

  const debouncedValue = useDebounce(recipeSearch, 500);

  const [fetchRecipes, hasNextPage, loader] = useFetch(ROUTES.RECIPES, setRecipes, {
    searchString: recipeSearch,
  });

  // firstLoad
  useEffect(() => {
    (async () => {
      await fetchRecipes('start');
    })();
  }, [debouncedValue]);
  const data = (
    <Formik
      initialValues={{ title, desc }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } else if (!validateTitle(values.title)) {
          errors.title = 'Invalid title';
        }

        if (!values.desc) {
          errors.desc = 'Required';
        } else if (!validateDescription(values.desc)) {
          errors.desc = 'Invalid description';
        }
        return errors;
      }}
      onSubmit={(values) => {
        save(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <CreateCookBookPage>
          <H1Styled size="56px">{isEdit ? 'Edit cookbook' : 'Create a new cookbook'}</H1Styled>
          <TitleContainer>
            <HeaderStyled>Cookbook title</HeaderStyled>
            <InputStyled
              placeholder="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title && touched.title && 'error'}
            />
            {errors.title && touched.title && <InputFeedback>{errors.title}</InputFeedback>}
          </TitleContainer>
          <TitleContainer>
            <HeaderStyled>Cookbook picture</HeaderStyled>
            <LabelAsButton htmlFor="image" small light>
              {file ? 'Uploaded!' : 'Upload'}
            </LabelAsButton>
            <InputStyled
              hide
              type="file"
              accept=".jpg, .png"
              id="image"
              name="image"
              onChange={fileChanges}
            />
          </TitleContainer>
          <TitleContainer>
            <HeaderStyled>Description</HeaderStyled>
            <DescriptionInput
              placeholder="Description"
              value={values.desc}
              name="desc"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.desc && touched.desc && 'error'}
            />
            {errors.desc && touched.desc && <InputFeedback>{errors.desc}</InputFeedback>}
          </TitleContainer>
          <TitleContainer>
            <CookBooksMenu setFoodPref={setFoodPref} foodPref={foodPref} />
          </TitleContainer>
          {recipesSelected.length > 0 && (
            <TitleContainer>
              <HeaderStyled>Saved Recipes</HeaderStyled>
              {recipesSelected}
            </TitleContainer>
          )}
          <TitleContainer>
            <HeaderStyled>Recepies</HeaderStyled>
            <InputStyled
              placeholder="Fresh meat"
              value={recipeSearch}
              onChange={(e) => {
                setRecipeSearch(e.target.value);
              }}
            />
          </TitleContainer>
          <TitleContainer>
            <RecepiesContainer noTopPadding>
              <Container padding="0" className="recipesContainer">
                {recipes &&
                  recipes.map((itemLocal) => {
                    const savedRecipe = (
                      <Recipe
                        removable
                        onRemovable={() => {
                          removeSaved(itemLocal, savedRecipe);
                        }}
                        key={itemLocal._id}
                        {...itemLocal}
                      />
                    );

                    if (!recipesSelectedIds.includes(itemLocal._id)) {
                      return (
                        <Recipe
                          savable
                          onSavable={() => {
                            addSaved(itemLocal, savedRecipe);
                          }}
                          key={itemLocal._id}
                          {...itemLocal}
                        />
                      );
                    }
                    return <></>;
                  })}
                {loader && <Loading />}
                {hasNextPage && recipes.length !== 0 && (
                  <ButtonStyled
                    disabled={loader}
                    onClick={() => {
                      fetchRecipes();
                    }}
                    secondary
                    light
                  >
                    Load more
                  </ButtonStyled>
                )}
              </Container>
            </RecepiesContainer>
          </TitleContainer>
          <ControllButtons>
            <ButtonStyled
              secondary
              small
              onClick={() => {
                history.goBack();
              }}
            >
              Cancel
            </ButtonStyled>
            <ButtonStyled small onClick={handleSubmit}>
              Save
            </ButtonStyled>
          </ControllButtons>
        </CreateCookBookPage>
      )}
    </Formik>
  );
  if (!isEdit || (isEdit && title && desc)) return data;
  return <Loading />;
};

export default CreateCookBookComponent;

CreateCookBookComponent.propTypes = {
  isEdit: PropTypes.bool,
  item: PropTypes.object,
};
