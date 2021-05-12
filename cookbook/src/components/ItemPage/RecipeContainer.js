import {ButtonStyled, Container, H1Styled} from "../common/StylesComponent";
import {Loading} from "../MultyUsed/Loading/Loading";
import {Recipe} from "../MultyUsed/Recipe";
import {RecepiesContainer} from "./style/ItemPageComponentStyle";
import React, {useEffect, useState} from "react";
import {useFetch} from "../MultyUsed/CustomHooks/useFetch";
import {ROUTES} from "../../constants";

const Recipes = (id) => {
    const [recipes, setRecipes] = useState([]);
    const [fetchBooks, hasNext, loading] = useFetch(ROUTES.RECIPES, setRecipes, {cookbookId: id.id} )
    // firstLoad
    useEffect(() => {
        fetchBooks();
    }, [id.id]);

    return (<RecepiesContainer>
        <H1Styled>Recepies</H1Styled>
        <Container className="recipesContainer">
            {recipes && recipes.map((i) => <Recipe key={`${i._id}recipe`} {...i} />)}
            {loading && <Loading/>}
            {hasNext && <ButtonStyled disabled={loading} onClick={()=>{fetchBooks()}} secondary light>Load more</ButtonStyled>}
        </Container>
    </RecepiesContainer>)
}

export default Recipes