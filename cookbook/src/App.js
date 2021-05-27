import React, {Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {GlobalStyle} from './globalStyles';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {Loading} from './components/MultyUsed/Loading/Loading';
import ScrollToTop from "./components/common/Scroller";
import {EditCookBook} from "./components/EditCookBook";
import {EditRecipe} from "./components/EditRecipe";

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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundMiddleware from "./components/404/NoItemMiddleware";
import {COMMON} from "./constants";
import {NotFound} from "./components/404/404";

function App() {
    return (
        <>
            <GlobalStyle/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
                                <NotFoundMiddleware propType={COMMON.PROFILE}>
                                    <Navbar/>
                                    <Profile/>
                                    <Footer/>
                                </NotFoundMiddleware>
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
                            <Route path="/editRecipe">
                                <Navbar/>
                                <EditRecipe/>
                                <Footer/>
                            </Route>
                            <Route path="/search/:type">
                                <Navbar/>
                                <CookBookSearch/>
                                <Footer/>
                            </Route>
                            <Route path="/info/:type/:id">
                                <NotFoundMiddleware>
                                    <Navbar/>
                                    <ItemPage/>
                                    <Footer/>
                                </NotFoundMiddleware>
                            </Route>
                            <Route path="/" exact>
                                <Navbar/>
                                <MainPage/>
                                <Footer/>
                            </Route>
                            <Route path="*">
                                <NotFound/>
                            </Route>
                        </Switch>
                    </ScrollToTop>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
