import React, {useState} from 'react';
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
import {RECIPE_FIELDS} from "../../constants";

const CreateRecepieComponent = () => {
    const [recipe, setRecipe] = useState({})
    const [currIngredient, setCurrIngredient] = useState('')
    const [currDirection, setCurrDirection] = useState('')

    const [file, setFile] = useState();
    const fileChanges = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

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
                {recipe.ingredients?.length>0 && recipe.ingredients.map((item, index) => {
                        return (<Item key={`${index}ing`}
                                      value={item}
                                      index={index}
                                      recipe={recipe}
                                      type={RECIPE_FIELDS.ingredients}
                                      setRecipe = {setRecipe}
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
                {recipe.directions?.length>0 && recipe.directions.map((item, index) => {
                        return (<Item key={`${index}ing`}
                                      value={item}
                                      index={index}
                                      recipe={recipe}
                                      type={RECIPE_FIELDS.directions}
                                      setRecipe = {setRecipe}
                        />)
                    }
                )}
            </IngredientsContainer>

            <ControllButtons>
                <ButtonStyled secondary small>
                    Cancel
                </ButtonStyled>
                <ButtonStyled small>Save</ButtonStyled>
            </ControllButtons>
        </CreateCookBookPage>
    );
};

export default CreateRecepieComponent;
