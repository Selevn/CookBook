import {Switch, Route} from "react-router-dom";
import SPAClientRouteConstants from "./constants/SPAClientRouteConstants";

import Users from "./components/Users";
import Settings from "./components/Settings";
import {CookBooks, Recipes} from "./components/Items";
import Statistic from "./components/Statistics";
import {Login} from "./components/Login";


const MyRouter = () => {
    return (
        <Switch>
            <Route exact path={SPAClientRouteConstants.login}>
                <Login/>
            </Route>
            <Switch>
                <Route exact path={SPAClientRouteConstants.home}>
                    <Users/>
                </Route>
                <Route path={SPAClientRouteConstants.users}>
                    <Users/>
                </Route>
                <Route path={SPAClientRouteConstants.cookbooks}>
                    <CookBooks/>
                </Route>
                <Route path={SPAClientRouteConstants.recipes}>
                    <Recipes/>
                </Route>
                <Route path={SPAClientRouteConstants.settings}>
                    <Settings/>
                </Route>
                <Route path={SPAClientRouteConstants.statistic}>
                    <Statistic/>
                </Route>
            </Switch>
        </Switch>
    )
}

export default MyRouter