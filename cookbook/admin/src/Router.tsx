import {Switch, Route} from "react-router-dom";
import RouteConstants from "./constants/RouteConstants";

import Users from "./components/Users";
import Settings from "./components/Settings";
import CookBooks from "./components/CookBooks";
import Recipes from "./components/Recipes";
import Statistic from "./components/Statistics";


const MyRouter = () => {
    return (
        <Switch>
            <Route exact path={RouteConstants.home}>
                <Users/>
            </Route>
            <Route path={RouteConstants.users}>
                <Users/>
            </Route>
            <Route path={RouteConstants.cookbooks}>
                <CookBooks/>
            </Route>
            <Route path={RouteConstants.recipes}>
                <Recipes/>
            </Route>
            <Route path={RouteConstants.settings}>
                <Settings/>
            </Route>
            <Route path={RouteConstants.statistic}>
                <Statistic/>
            </Route>
        </Switch>

    )
}

export default MyRouter