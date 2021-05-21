import React, {useCallback, useEffect, useState} from 'react';
import {ButtonStyled, Container, H1Styled, InputStyled} from '../common/StylesComponent';
import {useHistory} from "react-router-dom";

import {Recipe} from '../MultyUsed/Recipe';
import {
    ControllButtons,
    CreateCookBookPage,
    DescriptionInput,
    HeaderStyled,
    TitleContainer,
} from './style/CreateCookBookComponentStyle';
import {Loading} from "../MultyUsed/Loading/Loading";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {COOKBOOK_FIELDS, ROUTES} from "../../constants";
import useDebounce from "../MultyUsed/CustomHooks/useDebouncer";
import {fetchData, SendFile} from "../../Connectors/dataProvider";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {CookBooksMenu} from "../CookBookSearch/CookBooks";
import {RecepiesContainer} from "../ItemPage/style/ItemPageComponentStyle";

const CreateCookBookComponent = ({isEdit, item}) => {
    const {profile, auth} = useReduxState();
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [foodPref, setFoodPref] = useState("")
    const [recipeSearch, setRecipeSearch] = useState("")
    const [recipesSelected, setRecipesSelected] = useState([])
    const [recipesSelectedIds, setRecipesSelectedIds] = useState([])
    const [recipes, setRecipes] = useState([])
    const [file, setFile] = useState();



    const fileChanges = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const removeSaved = useCallback((item, saved) => {
        setRecipesSelected(s => s.filter(recipe => saved !== recipe));
        setRecipesSelectedIds(s => s.filter(recipeId => item._id !== recipeId));
    }, [])

    const addSaved = useCallback((item, saved) => {
        setRecipesSelected(s => [...s, saved])
        setRecipesSelectedIds(s => [...s, item._id])
    }, [])

    useEffect(()=>{
        (async () => {
            if(isEdit && item.recipesIds)
            {
                console.log(item)
                const recipes = await fetchData(ROUTES.RECIPES,null,{ids:JSON.stringify(item.recipesIds)})
                recipes.docs.forEach((recipeItem) => {
                    const savedRecipe = <Recipe removable onRemovable={
                        () => {
                            removeSaved(recipeItem, savedRecipe)
                        }
                    } key={recipeItem._id} {...recipeItem} />
                    addSaved(recipeItem, savedRecipe)
                })
                setTitle(item.name)
                setDesc(item.desc)
                const filters = {}
                item.filters.forEach((filterItem) => {
                    filters[filterItem] = true;
                })
                setFoodPref(filters)
            }
        })()
    },[isEdit, item])

    const save = async (e) => {
        e.preventDefault();

        const filtersNormalized = [];
        for (let filter in foodPref)
            foodPref[filter] && filtersNormalized.push(filter)

        if (!auth) {
            alert("You are not authorizated")
            return;
        }
        if (!file && !isEdit) {
            alert("You didn't select any file")
            return;
        }

        const formData = new FormData();
        if(file)
            formData.append('image', file);
        if(!file && isEdit)
            formData.append(COOKBOOK_FIELDS.image, item.image);
        if(isEdit){
            formData.append(COOKBOOK_FIELDS.ID, item._id);
        }
        formData.append(COOKBOOK_FIELDS.author, profile._id);
        formData.append(COOKBOOK_FIELDS.name, title);
        formData.append(COOKBOOK_FIELDS.desc, desc);
        formData.append(COOKBOOK_FIELDS.recipesIds, JSON.stringify(recipesSelectedIds));
        formData.append(COOKBOOK_FIELDS.creationDate, Date.now());

        formData.append(COOKBOOK_FIELDS.filters, JSON.stringify(filtersNormalized));

        SendFile(isEdit?ROUTES.EDIT_COOKBOOK:ROUTES.NEW_COOKBOOK, formData, auth)
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                console.log("err", error)
            });
    }


    const debouncedValue = useDebounce(recipeSearch, 500)


    const [fetchRecipes, hasNextPage, loader] = useFetch(ROUTES.RECIPES, setRecipes, {searchString: recipeSearch})

    // firstLoad
    useEffect(() => {
        (async () => {
            await fetchRecipes("start")
        })()
    }, [debouncedValue]);

    return (
        <CreateCookBookPage>
            <H1Styled size="56px">{isEdit ? `Edit cookbook`:`Create a new cookbook`}</H1Styled>
            <TitleContainer>
                <HeaderStyled>Cookbook title</HeaderStyled>
                <InputStyled placeholder="Title" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Cookbook picture</HeaderStyled>
                {/*<ButtonStyled small light>
          Upload
        </ButtonStyled>*/}
                <InputStyled type={"file"} name="image" onChange={fileChanges}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Description</HeaderStyled>
                <DescriptionInput placeholder="Description" value={desc} onChange={(e) => {
                    setDesc(e.target.value)
                }}/>
            </TitleContainer>
            <TitleContainer>
                <CookBooksMenu setFoodPref={setFoodPref} foodPref={foodPref}/>
            </TitleContainer>
            {
                recipesSelected.length > 0
                &&
                <TitleContainer>
                    <HeaderStyled>Saved Recipes</HeaderStyled>
                    {recipesSelected}
                </TitleContainer>
            }
            <TitleContainer>
                <HeaderStyled>Recepies</HeaderStyled>
                <InputStyled placeholder="Fresh meat" value={recipeSearch} onChange={(e) => {
                    setRecipeSearch(e.target.value)
                }}/>
            </TitleContainer>
            <TitleContainer>
                <RecepiesContainer noTopPadding
                >
                    <Container padding={"0"} className="recipesContainer">
                        {recipes && recipes.map((item) => {
                            const savedRecipe = <Recipe removable onRemovable={
                                () => {
                                    removeSaved(item, savedRecipe)
                                }
                            } key={item._id} {...item} />;

                            if (!recipesSelectedIds.includes(item._id)) {
                                return (<Recipe savable onSavable={
                                    () => {
                                        addSaved(item, savedRecipe)
                                    }
                                } key={item._id} {...item} />)
                            }
                        })}
                        {loader && <Loading/>}
                        {hasNextPage && recipes.length !== 0 && <ButtonStyled disabled={loader} onClick={() => {
                            fetchRecipes()
                        }} secondary light>Load more</ButtonStyled>}
                    </Container>
                </RecepiesContainer>
            </TitleContainer>
            <ControllButtons>
                <ButtonStyled secondary small onClick={() => {
                    history.goBack()
                }}>
                    Cancel
                </ButtonStyled>
                <ButtonStyled small onClick={save}>Save</ButtonStyled>
            </ControllButtons>
        </CreateCookBookPage>
    );
};

export default CreateCookBookComponent;
