import React, {Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {GlobalStyle} from './globalStyles';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {Loading} from './components/MultyUsed/Loading/Loading';
import ScrollToTop from "./components/common/Scroller";
import {EditCookBook} from "./components/EditCookBook";

const Login = React.lazy(() => import('./components/Login/LoginComponent.js'));
const Register = React.lazy(() => import('./components/Register/RegisterComponent.js'));
const MainPage = React.lazy(() => import('./components/MainPage/MainPageComponent.js'));
const ItemPage = React.lazy(() => import('./components/ItemPage/ItemPageComponent.js'));
const CookBookSearch = React.lazy(() =>
    import('./components/CookBookSearch/CookBookSearchComponent.js'),
);
const CreateRecepie = React.lazy(() =>
    import('./components/CreateRecepie/CreateRecepieComponent.js'),
);
const CreateCookBook = React.lazy(() =>
    import('./components/CreateCookBook/CreateCookBookComponent.js'),
);
const Profile = React.lazy(() => import('./components/Profile/ProfileComponent.js'));

function App() {
    return (
        <>
            <GlobalStyle/>
            <Router>
                <Suspense fallback={<Loading class="loading"/>}>
                    <ScrollToTop>
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/register">
                                <Register/>
                            </Route>
                            <Route path="/profile/:id">
                                <Navbar/>
                                <Profile/>
                                <Footer/>
                            </Route>
                            <Route path="/newRecipe">
                                <Navbar/>
                                <CreateRecepie/>
                                <Footer/>
                            </Route>
                            <Route path="/newCookBook">
                                <Navbar/>
                                <CreateCookBook/>
                                <Footer/>
                            </Route>
                            <Route path="/editCookBook">
                                <Navbar/>
                                <EditCookBook/>
                                <Footer/>
                            </Route>
                            <Route path="/search/:type">
                                <Navbar/>
                                <CookBookSearch/>
                                <Footer/>
                            </Route>
                            <Route path="/info/:type/:id">
                                <Navbar/>
                                <ItemPage/>
                                <Footer/>
                            </Route>
                            <Route path="/">
                                <Navbar/>
                                <MainPage/>
                                <Footer/>
                            </Route>
                            <Route path="*">
                                <Navbar/>
                                <MainPage/>
                                <Footer/>
                            </Route>
                        </Switch>
                    </ScrollToTop>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
