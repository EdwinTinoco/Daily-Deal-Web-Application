import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

import NavigationBar from "../navigation-bar/navigation-bar"
import ActiveDealsList from './active-deals-list'
import { devEnv } from "../../helpers/dev-env"

// const state = {
//    labels: ['January'],
//    datasets: [
//       {
//          label: 'Rainfall',
//          backgroundColor: '#facf57',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [65, 78]
//       },
//       {
//          label: 'hola',
//          backgroundColor: '#8d8c8c',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [26]
//       },
//       {
//          label: 'otro',
//          backgroundColor: '#00A6B4',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [79, 202]
//       },
//       {
//          label: 'clocks',
//          backgroundColor: '#ddd',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [87, 42, 93, 78, 191]
//       },
//       {
//          label: 'jackets',
//          backgroundColor: '#6800B4',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [46, 221, 99, 188, 137]
//       },
//       {
//          label: 'shoes',
//          backgroundColor: '#f85312',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [32, 176, 201, 474, 114]
//       }
//    ]
// }

export default function BusinessDashboard(props) {
   const [userId, setUserId] = useState()
   const [activeDealsList, setActiveDealsList] = useState([])
   const [activeDealsTotals, setActiveDealsTotals] = useState([])
   const [activeDealsGranTotal, setActiveDealsGranTotal] = useState(0)
   const [dataChart, setDataChart] = useState({})


   const getBaDealsList = () => {
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

         setUserId(userId)

         axios.get(`${devEnv}/api/ba/deals/${userId}`)
            .then(response => {
               console.log('deals', response.data);

               setActiveDealsList(
                  response.data
               )
            })
            .catch(error => {
               console.log('getBaDealsList error', error);
            })
      }
   }

   const getBaChartAllDealsTotalsSales = () => {
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

         setUserId(userId)

         let monthYear = []
         let monthYearNoDuplicates = []
         let dataSet = []

         axios.get(`${devEnv}/api/ba/all-deals/totals/${userId}`)
            .then(response => {
               console.log('all deals totals', response.data);

               for (let obj of response.data) {
                  monthYear.push(obj.month_year)

                  console.log('total sales', obj.total_sales.toFixed(2));

                  dataSet.push({
                     label: obj.product_title,
                     backgroundColor: ['#facf57', '#8d8c8c', '#ddd'],
                     borderColor: 'rgba(0,0,0,1)',
                     data: [parseFloat(obj.total_sales).toFixed(2)]
                  })
               }

               monthYearNoDuplicates = [...new Set(monthYear)];

               setDataChart({
                  labels: monthYearNoDuplicates,
                  datasets: dataSet
               })

               let granTotal = 0
               for (var total of response.data) {
                  granTotal += parseFloat(total.total_sales)
               }

               setActiveDealsGranTotal(granTotal.toFixed(2))

               // let header = Object.keys(response.data[0])
               // header.shift()
               // setHeaderActiveDealsTotals(header)

               setActiveDealsTotals(
                  response.data
               )
            })
            .catch(error => {
               console.log('getBaChartAllDealsTotalsSales error', error);
            })
      }
   }

   const tableHeaderActiveDeals = () => {
      let headerActiveDeals = ["Product", "Deal ID", "Deal URL", "Deal Started Date", "Deal Finished Date", "Stock", "Stock left", "Price", "Shipping Type", "Deal Status", "Actions"]

      return headerActiveDeals.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   const acitveDealsItems = () => {
      return activeDealsList.map(item => {
         return (
            <ActiveDealsList
               key={item.deal_id}
               item={item}
            />
         )
      })
   }

   const tableHeaderActiveDealsTotals = () => {
      let headerActiveDealsTotals = ['Product Title', 'Sales', 'Total']

      return headerActiveDealsTotals.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   const acitveDealsTotals = () => {
      return activeDealsTotals.map(item => {
         return (
            <ActiveDealsTotalsSalesList
               key={item.product_id}
               item={item}
            />
         )
      })
   }

   useEffect(() => {
      getBaChartAllDealsTotalsSales()
      getBaDealsList()
   }, [])

   return (
      <div className="business-admin-main-wrapper">
         <NavigationBar />

         <div className="chart-total-sales-info">
            <div className="chart-deals">
               <Bar
                  data={dataChart}
                  options={{
                     title: {
                        display: true,
                        text: 'Totals per product deal',
                        fontSize: 20
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

               <div className="deals-total-sales-list">
                  <div className="title">
                     <h2>Deals Sales</h2>
                  </div>

                  <table id='totals-deals-sales-table'>
                     <tbody>
                        <tr>{tableHeaderActiveDealsTotals()}</tr>
                        {acitveDealsTotals()}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="active-deals-wrapper">
            <div className="title">
               <h2>Deals List</h2>
            </div>

            <table id='active-deals-table'>
               <tbody>
                  <tr>{tableHeaderActiveDeals()}</tr>
                  {acitveDealsItems()}
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