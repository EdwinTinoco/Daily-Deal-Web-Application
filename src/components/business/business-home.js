import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation-bar/navigation-bar"
import ActiveDealsList from './active-deals-list'

const state = {
   labels: ['January', 'February', 'March',
      'April', 'Nov'],
   datasets: [
      {
         label: 'Rainfall',
         backgroundColor: '#f85312',
         borderColor: 'rgba(0,0,0,1)',
         data: [65, 59, 80, 81, 211]
      },
      {
         label: 'hola',
         backgroundColor: '#858383',
         borderColor: 'rgba(0,0,0,1)',
         data: [26, 148, 66, 247, 206]
      },
      {
         label: 'otro',
         backgroundColor: '#d8d7d7',
         borderColor: 'rgba(0,0,0,1)',
         data: [79, 202, 115, 183, 166]
      },
      {
         label: 'clocks',
         backgroundColor: '#f85312',
         borderColor: 'rgba(0,0,0,1)',
         data: [87, 42, 93, 78, 191]
      },
      {
         label: 'jackets',
         backgroundColor: '#858383',
         borderColor: 'rgba(0,0,0,1)',
         data: [46, 221, 99, 188, 137]
      },
      {
         label: 'shoes',
         backgroundColor: '#d8d7d7',
         borderColor: 'rgba(0,0,0,1)',
         data: [32, 176, 201, 474, 114]
      }
   ]
}

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

         <div className="chart-total-sales-info">
            <div className="chart-deals">
               <Bar
                  data={state}
                  options={{
                     title: {
                        display: true,
                        text: 'Sales per product deal',
                        fontSize: 10
                     },
                     legend: {
                        display: true,
                        position: 'right'
                     }
                  }}
               />
            </div>

            <div className="total-sales-info">
               <div className="total-sales">
                  <p>Total Sales: $14,234.45</p>
               </div>

               <div className="total-sales-deals-list">
                  <div className="product">
                     <p>Fossil Watch</p>
                     <p>Jordan XIII Shoes</p>
                     <p>Star Wars T-Shirt</p>

                  </div>

                  <div className="quantity">
                     <p>148</p>
                     <p>76</p>
                     <p>362</p>
                  </div>

                  <div className="sales">
                     <p>$2,723.68</p>
                     <p>$7,116.03</p>
                     <p>$3,629.75</p>
                  </div>
               </div>
            </div>
         </div>


         <div className="active-deals-main-wrapper">
            {acitveDealsItems()}

         </div>

      </div>
   )
}