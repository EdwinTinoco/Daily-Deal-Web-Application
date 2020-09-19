import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation-bar/navigation-bar"
import ActiveDealsList from './active-deals-list'

export default function BusinessHome(props) {
   const [activeDeal, setActiveDeal] = useState([])

   const getActiveDeal = () => {
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

         var userId = userIdArr.join('')
      }

      axios.get(`http://localhost:5000/api/active-deal/${userId}`)
         .then(response => {
            console.log('deal active', response.data);

            setActiveDeal(
               response.data
            )
         })
         .catch(error => {
            console.log('getDealActive error', error);

         })
   }

   const acitveDealsItems = () => {
      return activeDeal.map(item => {
         return (
            <ActiveDealsList
               key={item.deal_id}
               item={item}
            />
         )
      })
   }

   useEffect(() => {
      getActiveDeal()
   }, [])

   return (
      <div className="business-admin-main-wrapper">
         <NavigationBar />

         {acitveDealsItems()}
      </div>
   )
}