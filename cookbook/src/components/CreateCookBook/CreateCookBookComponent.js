import React, {useEffect, useState} from 'react';
import {ButtonStyled, H1Styled, InputStyled} from '../common/StylesComponent';

import {Recipe} from '../MultyUsed/Recipe';
import {
    ControllButtons,
    CreateCookBookPage,
    DescriptionInput,
    HeaderStyled,
    TitleContainer,
} from './style/CreateCookBookComponentStyle';
import debouncer from "../common/Debouncer";
import {Loading} from "../MultyUsed/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {ROUTES} from "../../constants";

const CreateCookBookComponent = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [recipeSearch, setRecipeSearch] = useState("")
    const [recipesSelected, setRecipesSelected] = useState([])
    const [recipes, setRecipes] = useState([])

    const [file, setFile] = useState();
    const fileChanges = (e) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    const fetchServer = debouncer(() => {
        fetchRecipes()
    }, 500)

    const searchRecipesHandler = (e) => {
        setRecipeSearch(e.target.value)
    }
    const [fetchRecipes, hasNextPage, loader] = useFetch(ROUTES.RECIPES, setRecipes, {searchString:recipeSearch})

    // firstLoad
    useEffect(() => {
        (async () => {
            await fetchRecipes('start');
        })()
    }, [recipeSearch]);

    return (
        <CreateCookBookPage>
            <H1Styled size="56px">Create a new cookbook</H1Styled>
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
                <InputStyled type={"file"} onChange={fileChanges}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Description</HeaderStyled>
                <DescriptionInput placeholder="Description" value={desc} onChange={(e) => {
                    setDesc(e.target.value)
                }}/>
            </TitleContainer>
            <TitleContainer>
                <HeaderStyled>Recepies</HeaderStyled>
                <InputStyled placeholder="Fresh meat" value={recipeSearch} onChange={searchRecipesHandler}/>
            </TitleContainer>
            <TitleContainer>
                <InfiniteScroll
                    dataLength={recipes.length}
                    hasMore={hasNextPage && recipes.length !== 0}/*hasNextPage && recipes.length !== 0*/
                    loader={<Loading/>}
                    next={fetchRecipes}
                    className="infinity-scroller"
                >
                    {loader && <Loading/>}
                    {!loader && recipes.map((item) => <Recipe savable key={item._id} {...item} />)}
                    {!loader && recipes.length === 0 && (<h1>No recipes</h1>)}
                </InfiniteScroll>
            </TitleContainer>
            <ControllButtons>
                <ButtonStyled secondary small>
                    Cancel
                </ButtonStyled>
                <ButtonStyled small>Save</ButtonStyled>
            </ControllButtons>
        </CreateCookBookPage>
    );
};

export default CreateCookBookComponent;
