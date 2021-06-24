import React, {useState} from "react";
import {TableContainer, UserContainer} from "../Users/Users.styled";
import Table from "../common/Table";
import {cookbooksColumnsCreator} from "../common/columns presets/cookBooksColumns";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import {recipesColumnsCreator} from "../common/columns presets/recipesColumns";

const Items = (type:"cookbook"|"recipe") => {
    let filler = {heading:"", src:""};
    let columns;


    const [rerenderFlag, changeRerenderFlag] = useState(true)


    if(type === "cookbook")
    {
        columns = cookbooksColumnsCreator(changeRerenderFlag);
        filler.heading = "CookBooks"
        filler.src = FrontEndRoutes.COOKBOOKS_STATISTICS_ALL
    }
    else if(type === "recipe"){
        filler.heading = "Recipes"
        filler.src = FrontEndRoutes.RECIPES_STATISTICS_ALL
        columns = recipesColumnsCreator(changeRerenderFlag);
    }
    else
        return <>
            Type error. Got type - ${type} instead of cookbook|recipe
        </>

    return (
        <UserContainer>
            <h1>{filler.heading}</h1>
            <TableContainer>
                <Table columns={columns} source={filler.src} rerenderFlag={rerenderFlag}/>
            </TableContainer>
        </UserContainer>
    )
}

export default Items