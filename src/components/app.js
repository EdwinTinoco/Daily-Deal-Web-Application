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
import ResetPassword from "./forgot-password/reset-password";
import SignUpCustomer from "./auth/signup-customer";
import DealProduct from "./pages/deal-product";
import DealProductSuccessPayment from "./products/deal-product-success-payment";
import NoMatch from "./pages/no-match";

export default function App(props) {
  const [userCookie, setUserCookie] = useState("")
  const [user, setUser] = useState(0)

  Icons();

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

        axios.get(`http://localhost:5000/api/user/${userId}`)
          .then(response => {
            console.log('response app user', response.data);

            if (response.data.length > 0) {
              setUser(
                response.data[0]
              )
            }
          }).catch(error => {
            console.log('error', error);
          });
      }

    } else {
      console.log('user not logged');
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
            <ProtectedAuth path='/auth' user={userCookie} component={Auth} />

            <Route path='/forgot-password' component={forgotPassword} />
            <Route path='/reset-password/:slug' component={ResetPassword} />

            <ProtectedMADashboard exact path='/ma/dashboard' user={userCookie} component={MasterDashboard} />
            <ProtectedMACreateBusinessAccount path='/ma/create-business-account' user={userCookie} component={CreateBusinessAccount} />
            <ProtectedMACreateDealsBusiness path='/ma/deals-business/detail/:slug' user={userCookie} component={DealsBusinessDetail} />

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


// const ProtectedHome = ({ user, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => user === "" ?
//         (
//           <Component {...props} />
//         ) :
//         (
//           <Redirect to="/ma/dashboard" />
//         )
//       }
//     />
//   )
// }

const ProtectedAuth = ({ user, component: Component, ...rest }) => {
  console.log('protected from auth', user);

  return (
    <Route
      {...rest}
      render={props => user === "" ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedMADashboard = ({ user, component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log('protected from ma dashboard', user);

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedMACreateBusinessAccount = ({ user, component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log('protected from ma create accunt', user);

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}

const ProtectedMACreateDealsBusiness = ({ user, component: Component, ...rest }) => {
  let currentUser = Cookies.get("_sb%_user%_session")
  console.log('protected from ma create accunt', user);

  return (
    <Route
      {...rest}
      render={props => currentUser !== "" && currentUser !== undefined ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect to="/" />
        )
      }
    />
  )
}