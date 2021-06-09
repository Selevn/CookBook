import {LinkItem, UserContainer, UserLinks, TableContainer} from "./Users.styled";
import {useRouteMatch} from "react-router-dom"
import {DataGrid, GridSortDirection} from '@material-ui/data-grid';
import UsersRouteConstants from "../../constants/UsersRouteConstants";
import {useEffect, useState} from "react";
import {get} from "../../connector/Proxy";
import {FrontEndRoutes} from "../../constants/ServerRoutes";
import {UserStatistic} from "../../interfaces/usersInterfaces";
import SortProxy from "../../connector/SortProxy";

const columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: (params: any) => {
            return `${params.value.first} ${params.value.last}`
        }
    },

    {field: 'email', headerName: 'Email', width: 150},
    {field: 'cookbooksCount', headerName: 'Cookbooks', width: 150},
    {field: 'recipesCount', headerName: 'Recipes', width: 150},
    {field: 'status', headerName: 'Status', width: 150},

];

const Users = () => {
    const {url} = useRouteMatch()

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const [sortModel, setSortModel] = useState([
        { field: '_id', sort: 'asc' as GridSortDirection },
    ]);

    const handleSortModelChange = (params:any) => {
        if (params.sortModel !== sortModel) {
            setSortModel(params.sortModel);
        }
    };

    useEffect(()=>{
        (async()=>{
            const sort = SortProxy(sortModel)
            const result  = await get(FrontEndRoutes.USERS_STATISTICS_ALL, {page:page, sort:sort}, setLoading);
            result.docs.forEach((item:UserStatistic) => item.id=item._id)
            setData(result.docs)
            if(totalRows === 0)
                setTotalRows(result.total)
        })()
    },[page])


    useEffect(() => {
        let active = true;

        (async () => {
            const sort = SortProxy(sortModel)
            const result  = await get(FrontEndRoutes.USERS_STATISTICS_ALL, {page:page, sort:sort}, setLoading);
            result.docs.forEach((item:UserStatistic) => item.id=item._id)
            setData(result.docs)
        })();

        return () => {
            active = false;
        };
    }, [sortModel]);


    return (
        <UserContainer>
            <UserLinks>
                <LinkItem to={url + UsersRouteConstants.all} activeClassName={"active"}>All users</LinkItem>
                <LinkItem to={url + UsersRouteConstants.blocked} activeClassName={"active"}>Blocked</LinkItem>
                <LinkItem to={url + UsersRouteConstants.deleted} activeClassName={"active"}>Deleted</LinkItem>
            </UserLinks>
            <TableContainer>
                <DataGrid
                    paginationMode={'server'}
                    rows={data}
                    columns={columns}
                    pageSize={15}
                    rowCount = {totalRows}

                    loading={loading}


                    page={page-1}
                    onPageChange={(params) => {
                        setPage(params.page+1);
                    }}

                    sortingMode="server"
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                />
            </TableContainer>
        </UserContainer>)
}

export default Users