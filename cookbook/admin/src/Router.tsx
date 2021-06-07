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
            <Route exact path={RouteConstants.users}>
                <Users/>
            </Route>
            <Route exact path={RouteConstants.cookbooks}>
                <CookBooks/>
            </Route>
            <Route exact path={RouteConstants.recipes}>
                <Recipes/>
            </Route>
            <Route exact path={RouteConstants.settings}>
                <Settings/>
            </Route>
            <Route exact path={RouteConstants.statistic}>
                <Statistic/>
            </Route>
        </Switch>

    )
}

export default MyRouter