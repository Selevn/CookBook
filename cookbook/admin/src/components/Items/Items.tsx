import React, {useState} from "react";
import {TableContainer, UserContainer} from "../Users/Users.styled";
import Table from "../common/Table";
import {cookbooksColumnsCreator} from "../common/columns presets/cookBooksColumns";
import {FrontEndRoutes} from "../../constants/ServerRoutes";

const Items = (type:"cookbook"|"recipe") => {
    let filler = {heading:"", src:""};
    if(type === "cookbook")
    {
        filler.heading = "CookBooks"
        filler.src = FrontEndRoutes.COOKBOOKS_STATISTICS_ALL
    }
    if(type === "recipe"){
        filler.heading = "Recipes"
        filler.src = FrontEndRoutes.RECIPES_STATISTICS_ALL
    }
    const [rerenderFlag, changeRerenderFlag] = useState(true)
    const columns = cookbooksColumnsCreator(changeRerenderFlag);

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