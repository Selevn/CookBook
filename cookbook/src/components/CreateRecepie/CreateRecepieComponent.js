import React, {useCallback, useEffect, useState} from 'react';
import {ButtonStyled, H1Styled, InputStyled, LabelAsButton} from '../common/StylesComponent';

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
import {COMMON, MESSAGES, RECIPE_FIELDS, ROUTES, TOAST_SETTINGS} from "../../constants";
import {SendFile} from '../../Connectors/dataProvider'
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {RecipesMenu} from "../CookBookSearch/Recipes";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {ServerMessageHandler} from "../MultyUsed/ResponseSuccesHandler";
import {useLogout} from "../MultyUsed/CustomHooks/useLogout";
import {AuthCheckerWrapper} from "../../Connectors/AuthChecker";

const CreateRecepieComponent = ({edit}) => {
    const history = useHistory();
    const [recipe, setRecipe] = useState({})
    const [cookTime, setCookTime] = useState(COMMON.ALLCONSTANT)
    const [currIngredient, setCurrIngredient] = useState('')
    const [currDirection, setCurrDirection] = useState('')
    const [file, setFile] = useState();
    const [secondaryFiles, setSecondaryFiles] = useState();

    useEffect(() => {
        const authCheck = AuthCheckerWrapper()
        if (!authCheck(auth))
        {
            toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
            logOut()
        }
    }, [])

    const secondaryFilesChange = (e) => {
        e.preventDefault();
        setSecondaryFiles(e.target.files)
    }

    const fileChanges = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }


    const {profile, auth} = useReduxState()
    const logOut = useLogout()

    const send = useCallback((e) => {
        e.preventDefault();
        if (!auth) {
            toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
            return;
        }
        if (!file && !edit) {

            toast.error(MESSAGES.ERROR.NO_FILE_CHOSEN, TOAST_SETTINGS);
            return;
        }

        const formData = new FormData();
        if(file)
            formData.append('image', file);
        if(!file && edit)
            formData.append(RECIPE_FIELDS.image, edit.image);

        if(secondaryFiles)
            for (const _file of secondaryFiles) {
                formData.append('gallery', _file)
            }
        if(!secondaryFiles && edit)
            formData.append(RECIPE_FIELDS.images, JSON.stringify(edit.images));

        if(edit)
            formData.append(RECIPE_FIELDS.ID, edit._id);
        formData.append(RECIPE_FIELDS.author, profile._id);
        formData.append(RECIPE_FIELDS.name, recipe.title);
        formData.append(RECIPE_FIELDS.desc, recipe.description);
        formData.append(RECIPE_FIELDS.ingredients, JSON.stringify(recipe.ingredients || []));
        formData.append(RECIPE_FIELDS.directions, JSON.stringify(recipe.directions || []));
        formData.append(RECIPE_FIELDS.creationDate, Date.now());
        formData.append(RECIPE_FIELDS.cookTime, cookTime);
        SendFile(edit?ROUTES.EDIT_RECIPE:ROUTES.NEW_RECIPE, formData, auth, logOut)
            .then(response => {
                ServerMessageHandler(response,null, ()=>{history.push(`/info/recipe/${edit._id}`)})
            })
            .catch((error) => {
                toast.error(MESSAGES.ERROR.UNKNOWN, TOAST_SETTINGS);
            });
    }, [file, secondaryFiles, recipe.title, recipe.description, recipe.ingredients, recipe.directions, cookTime])

    useEffect(() => {
        (async () => {
            if(edit){
                setCookTime(edit.cookTime)
                setRecipe(edit)
                setRecipe(s => ({...s, title: edit.name}))
                setRecipe(s => ({...s, description: edit.desc}))
            }
        })()
    }, [])

    return (
        <CreateCookBookPage>
            <H1Styled size="56px">{edit?`Edit recipe`:`Create a new recipe`}</H1Styled>
            <TitleContainer>
                <HeaderStyled>Recepie title</HeaderStyled>
                <InputStyled placeholder="Title" value={recipe.title} onChange={(e) => {
                    setRecipe(s => ({...s, title: e.target.value}))
                }}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Recepie primary picture</HeaderStyled>
                <LabelAsButton htmlFor={"image"} small light>
                    {file?`Uploaded!`:`Upload`}
                </LabelAsButton>
                <InputStyled hide type="file" id={"image"} name="image" onChange={fileChanges}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Recepie secondary pictures (8 max)</HeaderStyled>
                <LabelAsButton htmlFor={"galley"} small light>
                    {secondaryFiles?`Uploaded!`:`Upload many`}
                </LabelAsButton>
                <InputStyled hide type="file" id={"galley"} name="gallery" onChange={secondaryFilesChange} multiple/>
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
                <RecipesMenu cookTime={cookTime} setCookTime={setCookTime} isAllAvailible={false}/>
            </TitleContainer>
            <ControllButtons>
                <ButtonStyled secondary small onClick={history.goBack}>
                    Cancel
                </ButtonStyled>
                <ButtonStyled small onClick={send}>Save</ButtonStyled>
            </ControllButtons>
        </CreateCookBookPage>
    );
};

export default CreateRecepieComponent;
