import {LinkItem, UserContainer, UserLinks} from "./Users.styled";
import {useRouteMatch} from "react-router-dom"
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {
        field: 'name', headerName: 'Name', width: 250, valueGetter: (params: any) => {
            return `${params.value.first} ${params.value.last}`
        }
    },

    {field: 'email', headerName: 'Email', width: 150},
    {field: 'Cookbooks', headerName: 'Cookbooks', width: 150, valueGetter: (params: any) => {
            return "future"
        }},
    {field: 'Recipes', headerName: 'Recipes', width: 150},
    {field: 'Status', headerName: 'Status', width: 150},

];

const rows = [
    {
        _id: 1,
        id: 1,
        name: {first: "Ivan", last: "Skorodumov"},
        email: "adsd@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "etherum",
        desc: "desc",
        likes: [1, 2, 3, 4, 5],
        comments: [2, 3, 4]
    },
    {
        _id: 2,
        id: 2,
        name: {first: "Denis", last: "Kurmashev"},
        email: "asdsd@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "bitcoin",
        desc: "desc2",
        likes: [1, 2, 3, 4, 5],
        comments: [1]
    },
    {
        _id: 3,
        id: 3,
        name: {first: "Sergei", last: "Arzamasov"},
        email: "serg@gmail.com",
        image: "https://www.drsabanci.com/assets/images/prp-ile-cilt-yenileme/prp-ile-...",
        password: "chia",
        desc: "desc3",
        likes: [6],
        comments: []
    },
];

const Users = () => {
    const {url} = useRouteMatch()

    return (
        <UserContainer>
            <UserLinks>
                <LinkItem to={url + "/all"} activeClassName={"active"}>All users</LinkItem>
                <LinkItem to={url + "/blocked"} activeClassName={"active"}>Blocked</LinkItem>
                <LinkItem to={url + "/deleted"} activeClassName={"active"}>Deleted</LinkItem>
            </UserLinks>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} pageSize={5}/>
            </div>
        </UserContainer>)
}

export default Users