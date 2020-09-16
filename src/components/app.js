import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';

import Icons from "../helpers/icons";

import MasterAdminHome from "./pages/master-admin-home";
import BusinessAdminHome from "./pages/business-admin-home";
import Auth from "./pages/auth";
import SignUp from "./auth/signup";
import DealProduct from "./pages/deal-product";
import NoMatch from "./pages/no-match";

export default function App(props) {
  Icons();

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/ma-home' component={MasterAdminHome} />
          <Route exact path='/ba-home' component={BusinessAdminHome} />
          <Route path='/auth' component={Auth} />
          <Route path='/signup' component={SignUp} />
          <Route path='/deal/product/:slug' component={DealProduct} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}
