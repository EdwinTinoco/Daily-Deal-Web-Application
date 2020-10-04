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
import CreateBusinessAccount from "./master/create-business-account";
import DealsBusinessDetail from "./master/deals-business-detail";
import BusinessDashboard from "./business/business-dashboard";
import CreateNewDealProduct from "./business/create-new-deal-product";
import ActiveDealDetail from "./business/active-deal-detail";
import Auth from "./pages/auth";
import AuthCustomer from "./pages/auth-customer";
import forgotPassword from "./forgot-password/forgot-password";
import SignUpCustomer from "./auth/signup-customer";
import DealProduct from "./pages/deal-product";
import DealProductSuccessPayment from "./products/deal-product-success-payment";
import NoMatch from "./pages/no-match";

export default function App(props) {

  Icons();

  return (
    <div className="container">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path='/auth/customer' component={AuthCustomer} />
            <Route path='/signup/customer' component={SignUpCustomer} />
            <Route path='/auth' component={Auth} />

            <Route path='/forgot-password' component={forgotPassword} />

            <Route exact path='/ma/dashboard' component={MasterDashboard} />
            <Route path='/create-business-account' component={CreateBusinessAccount} />
            <Route path='/ma/deals-business/detail/:slug' component={DealsBusinessDetail} />

            <Route exact path='/ba/dashboard' component={BusinessDashboard} />
            <Route path='/ba/new-deal' component={CreateNewDealProduct} />
            <Route path='/ba/active-deal/detail/:slug' component={ActiveDealDetail} />

            <Route path='/deal/product/:slug' component={DealProduct} />
            <Route path="/success/:slug" component={DealProductSuccessPayment} />

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

