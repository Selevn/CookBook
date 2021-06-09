import {GridSortItem, GridSortModel} from "@material-ui/data-grid";

const SortProxy = (sortModel:GridSortModel|[]) : string => {
    if(sortModel.length === 0)
        return "_id"
    const model:GridSortItem = sortModel[0]

    let sortOutString:string

    switch(model.field){
        case "cookbooksCount":
        {
            sortOutString="userCookBooks.count"
            break;
        }
        case "recipesCount":
        {
            sortOutString="userRecipes.count"
            break;
        }
        default: sortOutString = model.field
    }
    switch(model.sort){
        case "desc":
        {
            sortOutString="-"+sortOutString
            break;
        }
        default: break;
    }
    return sortOutString
}

export default SortProxy