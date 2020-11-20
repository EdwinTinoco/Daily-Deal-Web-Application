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
import { devEnv } from "../helpers/dev-env"

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
import ResetPassword from "./forgot-password/reset-password";
import SignUpAdmin from "./auth/signup-admin";
import SignUpCustomer from "./auth/signup-customer";
import DealProduct from "./pages/deal-product";
import DealProductSuccessPayment from "./products/deal-product-success-payment";
import NoMatch from "./pages/no-match";

export default function App(props) {
  const [userCookie, setUserCookie] = useState("")
  const [userId, setUserId] = useState("")
  const [userRole, setUserRole] = useState("")
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")

  Icons();

  const handleSuccessfulLogin = (userId, userRole) => {
    setLoggedInStatus("LOGGED_IN")
    setUserId(userId)
    setUserRole(userRole)
  }

  const handleUnSuccessfulLogin = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const getUserCookie = () => {
    if (Cookies.get("_sb%_user%_session") !== undefined) {
      console.log('user logged in');

      setUserCookie(
        Cookies.get("_sb%_user%_session")
      )

      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
        for (var i = 0; i < userCookie.length; i++) {
          if (userCookie[i] == "%") {
            temp += 1
          }

          if (temp === 2) {
            if (userCookie[i] !== "%") {
              userIdArr.push(userCookie[i])
            }
          }
        }

        let userId = userIdArr.join('')

        axios.get(`${devEnv}/api/user/${userId}`)
          .then(response => {
            console.log('response app user', response.data);

            if (response.data.length > 0) {
              setLoggedInStatus('LOGGED_IN')

              setUserId(
                response.data[0].user_id
              )

              setUserRole(
                response.data[0].role_title
              )
            }
          }).catch(error => {
            console.log('error', error);
            setLoggedInStatus('NOT_LOGGED_IN')
          });
      }

    } else {
      console.log('user not logged');
      setLoggedInStatus('NOT_LOGGED_IN')
    }
  }

  const autorizedPages = () => {
    if (userRole === "master_admin") {
      return [
        <Route
          key="ma-dashboard"
          path="/ma/dashboard"
          component={MasterDashboard}
        />,
        <Route
          key="ma-create-business-account"
          path="/ma/create-business-account"
          component={CreateBusinessAccount}
        />,
        <Route
          key="ma-deals-business-detail"
          path="/ma/deals-business/detail/:slug"
          component={DealsBusinessDetail}
        />,
        <Route
          key="ba-active-deal-detail"
          path="/ba/active-deal/detail/:slug"
          component={ActiveDealDetail}
        />
      ]
    } else if (userRole === "business_admin") {
      return [
        <Route
          key="ba-dashboard"
          path="/ba/dashboard"
          component={BusinessDashboard}
        />,
        <Route
          key="ba-new-deal"
          path="/ba/new-deal"
          component={CreateNewDealProduct}
        />,
        <Route
          key="ba-active-deal-detail"
          path="/ba/active-deal/detail/:slug"
          component={ActiveDealDetail}
        />
      ]
    }
  }

  useEffect(() => {
    getUserCookie()
  }, [])

  return (
    <div className="container">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path='/auth/customer' component={AuthCustomer} />
            <Route path='/signup/customer' component={SignUpCustomer} />
            <Route path='/signup/admin' component={SignUpAdmin} />
            <Route
              path='/auth'
              render={props => (
                <Auth
                  {...props}
                  handleSuccessfulLogin={handleSuccessfulLogin}
                  handleUnSuccessfulLogin={handleUnSuccessfulLogin}
                />
              )}
            />

            <Route path='/forgot-password' component={forgotPassword} />
            <Route path='/reset-password/:slug' component={ResetPassword} />



            {/* <Route exact path='/ma/dashboard' component={MasterDashboard} /> */}
            {/* <Route path='/ma/create-business-account' component={CreateBusinessAccount} />
            <Route path='/ma/deals-business/detail/:slug' component={DealsBusinessDetail} /> */}

            {/* <Route exact path='/ba/dashboard' component={BusinessDashboard} />
            <Route path='/ba/new-deal' component={CreateNewDealProduct} />
            <Route path='/ba/active-deal/detail/:slug' component={ActiveDealDetail} /> */}

            <Route path='/deal/product/:slug' component={DealProduct} />
            <Route path="/success/:slug" component={DealProductSuccessPayment} />

            {loggedInStatus === "LOGGED_IN" ? autorizedPages() : <Redirect to="/" />}

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}