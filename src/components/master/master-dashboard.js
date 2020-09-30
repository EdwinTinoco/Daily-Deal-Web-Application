import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

import NavigationBar from "../navigation-bar/navigation-bar"
import AllActiveDealsList from './all-active-deals-list'

const state = {
   labels: ['January', 'February', 'March',
      'April', 'Nov'],
   datasets: [
      {
         label: 'Company 1',
         backgroundColor: '#facf57',
         borderColor: 'rgba(0,0,0,1)',
         data: [65, 59, 80, 81, 211]
      },
      {
         label: 'Company 2',
         backgroundColor: '#8d8c8c',
         borderColor: 'rgba(0,0,0,1)',
         data: [26, 148, 66, 247, 206]
      },
      {
         label: 'Company 3',
         backgroundColor: '#00A6B4',
         borderColor: 'rgba(0,0,0,1)',
         data: [79, 202, 115, 183, 166]
      }
   ]
}

export default function MasterDashboard(props) {
   const [userId, setUserId] = useState()
   const [allActiveDeals, setAllActiveDeals] = useState([])
   const [headerActiveDealsTotals, setHeaderActiveDealsTotals] = useState([])
   const [activeDealsTotals, setActiveDealsTotals] = useState([])
   const [activeDealsGranTotal, setActiveDealsGranTotal] = useState(0)

   const getAllActiveDealsList = () => {
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

      axios.get(`http://localhost:5000/api/all-active-deals`)
         .then(response => {
            console.log('deal active', response.data);

            setAllActiveDeals(
               response.data
            )
         })
         .catch(error => {
            console.log('getAllActiveDealsList error', error);
         })
   }

   // const getActiveDealsTotals = () => {
   //    let userCookie = Cookies.get("_sb%_user%_session")
   //    let temp = 0
   //    let userIdArr = []

   //    if (userCookie !== undefined) {
   //       for (var i = 0; i < userCookie.length; i++) {
   //          if (userCookie[i] == "%") {
   //             temp += 1
   //          }

   //          if (temp === 2) {
   //             if (userCookie[i] !== "%") {
   //                userIdArr.push(userCookie[i])
   //             }
   //          }
   //       }

   //       var userId = userIdArr.join('')

   //       setUserId(userId)
   //    }
   //    axios.get(`http://localhost:5000/api/active-deals/totals/${userId}`)
   //       .then(response => {
   //          console.log('deal active totals', response.data);

   //          let granTotal = 0
   //          for (var total of response.data) {
   //             granTotal += parseFloat(total.total_sales)
   //          }

   //          setActiveDealsGranTotal(granTotal.toFixed(2))

   //          let header = Object.keys(response.data[0])
   //          header.shift()
   //          setHeaderActiveDealsTotals(header)

   //          setActiveDealsTotals(
   //             response.data
   //          )
   //       })
   //       .catch(error => {
   //          console.log('getActiveDealsTotals error', error);
   //       })
   // }

   const tableHeaderAllActiveDeals = () => {
      let headerAllActiveDeals = ["Deal Product", "Company/Name", "Email", "Deal Created Date", "Stock", "Stock left", "Price", "Status", "Actions"]

      return headerAllActiveDeals.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   const allAcitveDealsItems = () => {
      return allActiveDeals.map(item => {
         return (
            <AllActiveDealsList
               key={item.deal_id}
               item={item}
            />
         )
      })
   }

   // const tableHeaderActivateDealsTotals = () => {
   //    return headerActiveDealsTotals.map((key, index) => {
   //       return <th key={index}>{key.toUpperCase()}</th>
   //    })
   // }

   // const acitveDealsTotals = () => {
   //    return activeDealsTotals.map(item => {
   //       return (
   //          <ActiveDealsTotalsSalesList
   //             key={item.product_id}
   //             item={item}
   //          />
   //       )
   //    })
   // }

   useEffect(() => {
      // getActiveDealsTotals()
      getAllActiveDealsList()
   }, [])

   return (
      <div className="master-admin-main-wrapper">
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

            <div className="deals-total-sales-info">
               <div className="gran-total-sales">
                  <div className="title">
                     <p>Total Sales</p>
                  </div>

                  <div className="total">
                     <p>{`$${activeDealsGranTotal}`}</p>
                  </div>
               </div>

               {/* <div className="deals-total-sales-list">
                  <div className="title">
                     <h2>Deals Sales</h2>
                  </div>

                  <table id='totals-deals-sales-table'>
                     <tbody>
                        <tr>{tableHeaderActivateDealsTotals()}</tr>
                        {acitveDealsTotals()}
                     </tbody>
                  </table>
               </div> */}
            </div>
         </div>

         <div className="active-deals-wrapper">
            <div className="title">
               <h2>Acitve Deals List</h2>
            </div>

            <table id='active-deals-table'>
               <tbody>
                  <tr>{tableHeaderAllActiveDeals()}</tr>
                  {allAcitveDealsItems()}
               </tbody>
            </table>
         </div>
      </div>
   )
}


const ActiveDealsTotalsSalesList = (props) => {
   return (
      <tr key={props.key}>
         <td>{props.item.product_title}</td>
         <td>{props.item.sales}</td>
         <td>{`$${props.item.total_sales.toFixed(2)}`}</td>
      </tr>
   )
}