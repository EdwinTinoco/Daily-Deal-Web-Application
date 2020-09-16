import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/daily-deal-logo.png'


export default function MasterAdminNavbar(props) {
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
               console.log('current user', response.data);

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
      <div className="master-admin-main-navbar">
         <div className="left-column">
            <img src={Logo} alt='Logo' />
         </div>

         <div className="center-column">
            <div className="links">
               <div className="link">
                  <Link to="/ma-home">Home</Link>
               </div>
            </div>
         </div>

         <div className="right-column">
            <div className="user-info">
               {`${user.user_name}  |  ${user.user_email}`}
            </div>
         </div>
      </div>
   )
}