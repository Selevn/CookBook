import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import { Navbar } from './components/Navbar';
// eslint-disable-next-line
import { Profile } from './components/Profile';
import { Footer } from './components/Footer';
// eslint-disable-next-line
import { CreateCookBook } from './components/CreateCookBook';
// eslint-disable-next-line
import { Login } from './components/Login';
// eslint-disable-next-line
import { CreateRecepie } from './components/CreateRecepie';
// eslint-disable-next-line
import { CookBookSearch } from './components/CookBookSearch';
import { ItemPage } from './components/ItemPage';
import { MainPage } from './components/MainPage';
import { Register } from './components/Register';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Navbar />
            <Profile />
            <Footer />
          </Route>
          <Route path="/newRecipe">
            <Navbar />
            <CreateRecepie />
            <Footer />
          </Route>
          <Route path="/newCookBook">
            <Navbar />
            <CreateCookBook />
            <Footer />
          </Route>
          <Route path="/search/:type">
            <Navbar />
            <CookBookSearch />
            <Footer />
          </Route>
          <Route path="/info/:type/:id">
            <Navbar />
            <ItemPage />
            <Footer />
          </Route>
          <Route path="/">
            <Navbar />
            <MainPage />
            <Footer />
          </Route>
          <Route path="*">
            <Navbar />
            <MainPage />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
