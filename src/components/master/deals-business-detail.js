import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation-bar/navigation-bar"
import ActiveDealsList from '../business/active-deals-list'

const state = {
   labels: ['January', 'February', 'March',
      'April', 'Nov'],
   datasets: [
      {
         label: 'Rainfall',
         backgroundColor: '#facf57',
         borderColor: 'rgba(0,0,0,1)',
         data: [65, 59, 80, 81, 211]
      },
      {
         label: 'hola',
         backgroundColor: '#8d8c8c',
         borderColor: 'rgba(0,0,0,1)',
         data: [26, 148, 66, 247, 206]
      },
      {
         label: 'otro',
         backgroundColor: '#00A6B4',
         borderColor: 'rgba(0,0,0,1)',
         data: [79, 202, 115, 183, 166]
      },
      {
         label: 'clocks',
         backgroundColor: '#ddd',
         borderColor: 'rgba(0,0,0,1)',
         data: [87, 42, 93, 78, 191]
      },
      {
         label: 'jackets',
         backgroundColor: '#6800B4',
         borderColor: 'rgba(0,0,0,1)',
         data: [46, 221, 99, 188, 137]
      },
      {
         label: 'shoes',
         backgroundColor: '#f85312',
         borderColor: 'rgba(0,0,0,1)',
         data: [32, 176, 201, 474, 114]
      }
   ]
}

export default function DealsBusinessDetail(props) {

   const [userId, setUserId] = useState(props.match.params.slug)
   const [activeDeals, setActiveDeals] = useState([])
   const [headerActiveDealsTotals, setHeaderActiveDealsTotals] = useState([])
   const [activeDealsTotals, setActiveDealsTotals] = useState([])
   const [activeDealsGranTotal, setActiveDealsGranTotal] = useState(0)

   const getActiveDealsList = () => {
      axios.get(`https://et-daily-deal-backend.herokuapp.com/api/active-deals/${userId}`)
         .then(response => {
            console.log('deal active', response.data);

            setActiveDeals(
               response.data
            )
         })
         .catch(error => {
            console.log('getDealActive error', error);
         })
   }

   const getActiveDealsTotals = () => {
      axios.get(`https://et-daily-deal-backend.herokuapp.com/api/active-deals/totals/${userId}`)
         .then(response => {
            console.log('deal active totals', response.data);

            let granTotal = 0
            for (var total of response.data) {
               granTotal += parseFloat(total.total_sales)
            }

            setActiveDealsGranTotal(granTotal.toFixed(2))

            let header = Object.keys(response.data[0])
            header.shift()
            setHeaderActiveDealsTotals(header)

            setActiveDealsTotals(
               response.data
            )
         })
         .catch(error => {
            console.log('getActiveDealsTotals error', error);
         })
   }

   const tableHeaderActiveDeals = () => {
      let headerActiveDeals = ["Product", "Deal Created Date", "Stock", "Stock_left", "Price", "Status", "Actions"]

      return headerActiveDeals.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   const acitveDealsItems = () => {
      return activeDeals.map(item => {
         return (
            <ActiveDealsList
               key={item.deal_id}
               item={item}
            />
         )
      })
   }

   const tableHeaderActivateDealsTotals = () => {
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
      getActiveDealsTotals()
      getActiveDealsList()
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
                        <tr>{tableHeaderActivateDealsTotals()}</tr>
                        {acitveDealsTotals()}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="active-deals-wrapper">
            <div className="title">
               <h2>Acitve Deals List</h2>
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