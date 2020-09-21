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

import Home from './pages/home'
import MasterDashboard from "./master/master-dashboard";
import CreateAccount from "./master/create-account";
import DealsBusinessDetail from "./master/deals-business-detail";
import BusinessDashboard from "./business/business-dashboard";
import CreateNewDealProduct from "./business/create-new-deal-product";
import ActiveDealDetail from "./business/active-deal-detail";
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
          <Route exact path="/" component={Home} />

          <Route path='/auth' component={Auth} />
          <Route path='/signup' component={SignUp} />

          <Route exact path='/ma/dashboard' component={MasterDashboard} />
          <Route path='/create-account' component={CreateAccount} />
          <Route path='/ma/deals-business/detail/:slug' component={DealsBusinessDetail} />

          <Route exact path='/ba/dashboard' component={BusinessDashboard} />
          <Route path='/ba/new-deal' component={CreateNewDealProduct} />
          <Route path='/ba/active-deal/detail/:slug' component={ActiveDealDetail} />

          <Route path='/deal/product/:slug' component={DealProduct} />

          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}
