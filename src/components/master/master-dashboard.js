import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

import NavigationBar from "../navigation-bar/navigation-bar"
import AllActiveDealsList from './all-active-deals-list'
import { devEnv } from "../../helpers/dev-env"

// const state = {
//    labels: ['January', 'February', 'March',
//       'April', 'Nov'],
//    datasets: [
//       {
//          label: 'Company 1',
//          backgroundColor: '#facf57',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [65, 59, 80, 81, 211]
//       },
//       {
//          label: 'Company 2',
//          backgroundColor: '#8d8c8c',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [26, 148, 66, 247, 206]
//       },
//       {
//          label: 'Company 3',
//          backgroundColor: '#00A6B4',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [79, 202, 115, 183, 166]
//       }
//    ]
// }

export default function MasterDashboard(props) {
   const [userId, setUserId] = useState()
   const [allActiveDeals, setAllActiveDeals] = useState([])
   const [activeDealsTotals, setActiveDealsTotals] = useState([])
   const [dataChart, setDataChart] = useState({})
   const [showSpinner, setShowSpinner] = useState("none")

   const getAllActiveDealsList = () => {
      let currentDate = moment.utc().format()

      axios.get(`${devEnv}/api/ma/all-active-deals/${currentDate}`)
         .then(response => {
            console.log('all active deals', response.data);

            setAllActiveDeals(
               response.data
            )
         })
         .catch(error => {
            console.log('getAllActiveDealsList error', error);
         })
   }

   const getBaChartAllDealsTotalsSales = async () => {
      setShowSpinner("block")

      let monthYear = []
      let monthYearNoDuplicates = []
      let dataSet = []

      await axios.get(`${devEnv}/api/ma/all-deals/totals`)
         .then(response => {
            console.log('all ma deals totals', response.data);

            for (let obj of response.data) {
               monthYear.push(obj.month_year)

               console.log('total sales', obj.total_sales.toFixed(2));

               var letters = "0123456789ABCDEF";
               var color = '#';
               for (var i = 0; i < 6; i++)
                  color += letters[(Math.floor(Math.random() * 16))];

               dataSet.push({
                  label: obj.user_name,
                  backgroundColor: [color],
                  borderColor: 'rgba(0,0,0,1)',
                  data: [parseFloat(obj.total_sales).toFixed(2)]
               })
            }

            monthYearNoDuplicates = [...new Set(monthYear)];

            setDataChart({
               labels: monthYear,
               datasets: dataSet
            })

            // let header = Object.keys(response.data[0])
            // header.shift()
            // setHeaderActiveDealsTotals(header)

            setActiveDealsTotals(
               response.data
            )

            setShowSpinner("none")
         })
         .catch(error => {
            console.log('getBaChartAllDealsTotalsSales error', error);
            setShowSpinner("none")
         })
   }

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

   const tableHeaderActiveDealsTotals = () => {
      let headerActiveDealsTotals = ['Company', 'Sales', 'Total']

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
      getAllActiveDealsList()
   }, [])

   return (
      <div className="master-admin-main-wrapper">
         <NavigationBar />

         {showSpinner === "block" ? 
            (
               <div className="spinner" style={{ display: showSpinner }}>
                  <FontAwesomeIcon icon="spinner" spin /><p>Loading...</p>
               </div> 
            )
            :
            (
               <div>
                  <div className="chart-total-sales-info">
                     <div className="chart-deals">
                        <Bar
                           data={dataChart}
                           width={110}
                           height={40}
                           options={{
                              title: {
                                 display: true,
                                 text: 'Sales per Business Account',
                                 fontSize: 10
                              },
                              legend: {
                                 display: true,
                                 position: 'right'
                              },
                              maintainAspectRatio: false
                           }}
                        />
                     </div>

                     <div className="deals-total-sales-info">
                        <div className="deals-total-sales">
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
                           <tr>{tableHeaderAllActiveDeals()}</tr>
                           {allAcitveDealsItems()}
                        </tbody>
                     </table>
                  </div>
               </div>
            )
         }
      </div>
   )
}


const ActiveDealsTotalsSalesList = (props) => {
   return (
      <tr key={props.key}>
         <td>{props.item.user_name}</td>
         <td>{props.item.sales}</td>
         <td>{`$${props.item.total_sales.toFixed(2)}`}</td>
      </tr>
   )
}