import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'


export default function NavigationBar(props) {
   const [user, setUser] = useState({})

   const handleLogout = () => {
      setUser({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const getCurrentUser = () => {
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
               console.log('Navigation Bar current user', response.data);

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               console.log('getCurrentUser error', error);
            });
      }
   }

   useEffect(() => {
      getCurrentUser()
   }, [])

   return (
      <div className="navigation-bar-main-wrapper">
         <div className="left-column">
            <img src={Logo} alt='Logo' />
         </div>

         <div className="center-column">
            <div className="links">
               <div className="link">
                  <Link to="/">Home</Link>
               </div>

               {Object.entries(user).length > 0 ? user.role_title === "master_admin" ?
                  (
                     <div className="link">
                        <Link to="/ma/dashboard">Dashboard</Link>
                        <Link to='/create-account'>Create Account</Link>
                     </div>
                  )
                  : user.role_title === "business_admin" ?
                     (
                        <div className="link">
                           <Link to="/ba/dashboard">Dashboard</Link>
                           <Link to="/ba/new-deal">Deals</Link>
                        </div>
                     )
                     : null
                  : null
               }
            </div>
         </div>

         <div className="right-column">

            {Object.entries(user).length > 0 ?
               (
                  <div className="user-info">
                     <p>{`${user.user_name}  |  ${user.user_email}`}</p>
                     {user.role_title === "master_admin" ? <p>Master Account</p> : <p>Business Account</p>}
                  </div>
               )
               :
               (
                  <div className="login">
                     <div className="auth">
                        <Link to="/auth">Login</Link>
                     </div>

                     <Link to="/auth">
                        <div className="user-icon">
                           <FontAwesomeIcon icon="user" />
                        </div>
                     </Link>
                  </div>
               )
            }
         </div>
      </div>
   )
}