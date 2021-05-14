import React, {useCallback, useState} from 'react';
import {ButtonStyled, H1Styled, InputStyled} from '../common/StylesComponent';

import {
    DescriptionInput,
    HeaderStyled,
    IngredientsContainer,
} from './style/CreateRecepieComponentStyle';
import {
    AddContainer,
    ControllButtons,
    CreateCookBookPage,
    TitleContainer,
} from '../CreateCookBook/style/CreateCookBookComponentStyle';
import Item from "./Item";
import {COMMON, RECIPE_FIELDS, ROUTES} from "../../constants";
import {SendFile} from '../../Connectors/dataProvider'
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {RecipesMenu} from "../CookBookSearch/Recipes";

const CreateRecepieComponent = () => {
    const [recipe, setRecipe] = useState({})
    const [cookTime, setCookTime] = useState(COMMON.ALLCONSTANT)
    const [currIngredient, setCurrIngredient] = useState('')
    const [currDirection, setCurrDirection] = useState('')
    const [file, setFile] = useState();
    const fileChanges = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const {profile, auth} = useReduxState()


    const onFileSubmit = useCallback((e) => {
        e.preventDefault();
        if (!auth) {
            alert("You are not authorizated")
            return;
        }
        if (!file) {
            alert("You didn't select any file")
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append(RECIPE_FIELDS.author, profile._id);
        formData.append(RECIPE_FIELDS.name, recipe.title);
        formData.append(RECIPE_FIELDS.desc, recipe.description);
        formData.append(RECIPE_FIELDS.ingredients, JSON.stringify(recipe.ingredients));
        formData.append(RECIPE_FIELDS.directions, JSON.stringify(recipe.directions));
        formData.append(RECIPE_FIELDS.creationDate, Date.now());
        formData.append(RECIPE_FIELDS.cookTime, cookTime);
        SendFile(ROUTES.NEW_RECIPE, formData, auth)
            .then(response =>{
                console.log(response)
            })
            .catch((error) => {
                console.log("err", error)
            });
    }, [file])


    return (
        <CreateCookBookPage>
            <H1Styled size="56px">Create a new recepie</H1Styled>
            <TitleContainer>
                <HeaderStyled>Recepie title</HeaderStyled>
                <InputStyled placeholder="Title" value={recipe.title} onChange={(e) => {
                    setRecipe(s => ({...s, title: e.target.value}))
                }}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Recepie picture</HeaderStyled>
                {/*<ButtonStyled small light>
                    Upload
                </ButtonStyled>*/}
                <InputStyled type="file" name="image" onChange={fileChanges}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Description</HeaderStyled>
                <DescriptionInput
                    placeholder="Description"
                    value={recipe.description}
                    onChange={(e) => {
                        setRecipe(s => ({...s, description: e.target.value}))
                    }}
                />
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Ingredients</HeaderStyled>
                <AddContainer>
                    <InputStyled
                        placeholder="Add ingredient"
                        value={currIngredient}
                        onChange={(e) => {
                            setCurrIngredient(e.target.value)
                        }}
                    />
                    <ButtonStyled tiny onClick={
                        () => {
                            recipe.ingredients
                                ?
                                recipe.ingredients.push(currIngredient)
                                :
                                recipe.ingredients = [currIngredient]
                            setRecipe(recipe)
                            setCurrIngredient("")
                        }}>Add</ButtonStyled>
                </AddContainer>
            </TitleContainer>
            <IngredientsContainer>
                {recipe.ingredients?.length > 0 && recipe.ingredients.map((item, index) => {
                        return (<Item key={`${index}ing`}
                                      value={item}
                                      index={index}
                                      recipe={recipe}
                                      type={RECIPE_FIELDS.ingredients}
                                      setRecipe={setRecipe}
                        />)
                    }
                )}
            </IngredientsContainer>
            <TitleContainer>
                <HeaderStyled>Directions</HeaderStyled>
                <AddContainer>
                    <InputStyled
                        placeholder="Directions"
                        value={currDirection}
                        onChange={(e) => {
                            setCurrDirection(e.target.value)
                        }}
                    />
                    <ButtonStyled
                        tiny
                        onClick={
                            () => {
                                recipe.directions
                                    ?
                                    recipe.directions.push(currDirection)
                                    :
                                    recipe.directions = [currDirection]
                                setRecipe(recipe)
                                setCurrDirection("")
                            }}>Add</ButtonStyled>
                </AddContainer>
            </TitleContainer>
            <IngredientsContainer>
                {recipe.directions?.length > 0 && recipe.directions.map((item, index) => {
                        return (<Item key={`${index}ing`}
                                      value={item}
                                      index={index}
                                      recipe={recipe}
                                      type={RECIPE_FIELDS.directions}
                                      setRecipe={setRecipe}
                        />)
                    }
                )}
            </IngredientsContainer>

            <TitleContainer>
                <RecipesMenu cookTime={cookTime} setCookTime={setCookTime}/>
            </TitleContainer>
            <ControllButtons>
                <ButtonStyled secondary small>
                    Cancel
                </ButtonStyled>
                <ButtonStyled small onClick={onFileSubmit}>Save</ButtonStyled>
            </ControllButtons>
        </CreateCookBookPage>
    );
};

export default CreateRecepieComponent;
