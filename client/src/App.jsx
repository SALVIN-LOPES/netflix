import React from 'react'
import "./app.scss"
import Home from './pages/home/Home'
import Register from './pages/register/Register';
import Login from './pages/login/Login';

import Watch from './pages/watch/Watch'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const App = () => {
  const user = true; //to get the authentication : 
  return (
    <Router>
      <Switch>
        {/* ----------------------BEFORE LOGIN OF USER : --------------------- */}
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        {/* //register :  */}
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        {/* //login :  */}
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        {/* -----------AFTER LOGGED IN USER : ------------------- */}
        {user && (
          <>
            <Route path="/movies">
              <Home type="movies" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )

        }
      </Switch>
    </Router>
  )
};

export default App;