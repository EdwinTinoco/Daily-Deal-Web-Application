import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

import Icons from "../helpers/icons";

import UserHome from "./pages/user-home"
import Auth from "./pages/auth"
import SignUp from "./auth/signup";
import NoMatch from "./pages/no-match";

export default function App(props) {
  Icons();

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={UserHome} />
          <Route path='/auth' component={Auth} />
          <Route path='/signup' component={SignUp} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}
