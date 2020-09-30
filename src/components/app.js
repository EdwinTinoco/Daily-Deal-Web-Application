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
import AuthCustomer from "./pages/auth-customer";
import SignUpCustomer from "./auth/signup";
import DealProduct from "./pages/deal-product";
import DealProductSuccessPayment from "./products/deal-product-success-payment";
import NoMatch from "./pages/no-match";

export default function App(props) {
  const [user, setUser] = useState({})

  Icons();

  const getUserCookie = () => {
    if (Cookies.get("_sb%_user%_session") !== undefined) {
      console.log('user logged in');

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
            console.log('app get user', response.data);

            if (response.data.length > 0) {
              if (response.data[0].role_title !== "user") {
                setUser(
                  response.data[0]
                )
              }
            }
          }).catch(error => {
            console.log('getCurrentUser error', error);
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
            <Route path='/auth' component={Auth} />

            <Route exact path='/ma/dashboard' component={MasterDashboard} />
            <Route path='/create-account' component={CreateAccount} />
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

// const ProtectedAuth = ({ user, component: Component, ...rest }) => {
//   console.log('protected auth', user);
//   return (
//     <Route
//       {...rest}
//       render={props => Object.entries(user).length < 1 ?
//         (
//           <Component {...props} />
//         ) :
//         (
//           <Redirect to="/" />
//         )
//       }
//     />
//   )
// }

// const ProtectedMasterDashboard = ({ user, component: Component, ...rest }) => {
//   console.log('protected master dashboard', user);

//   let tempUser = {}

//   if (Cookies.get("_sb%_user%_session") !== undefined) {
//     console.log('user logged in');

//     let userCookie = Cookies.get("_sb%_user%_session")
//     let temp = 0
//     let userIdArr = []

//     if (userCookie !== undefined) {
//       for (var i = 0; i < userCookie.length; i++) {
//         if (userCookie[i] == "%") {
//           temp += 1
//         }

//         if (temp === 2) {
//           if (userCookie[i] !== "%") {
//             userIdArr.push(userCookie[i])
//           }
//         }
//       }

//       let userId = userIdArr.join('')

//       const result = axios.get(`http://localhost:5000/api/user/${userId}`)


//       console.log('tempUser', result);


//     }
//   } else {
//     console.log('user not logged');
//   }

//   return (
//     <Route
//       {...rest}
//       render={props => Object.entries(user).length > 0 ?
//         (
//           <Component {...props} />
//         ) :
//         (
//           <Redirect to="/" />
//         )
//       }
//     />
//   )
// }