import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import Pagination from "react-js-pagination";

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
   const [year, setYear] = useState("")
   const [showSpinner, setShowSpinner] = useState("none")
   const [showSpinner2, setShowSpinner2] = useState("none")
   const [activePage, setActivePage] = useState(1)
   const [perPage] = useState(15)
   const [pageRange] = useState(5)
   const [totalRecords, setTotalrecords] = useState(0)
   const [resultsRecords, setResultsRecords] = useState(0)

   const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);

      var offset = (pageNumber - 1) * perPage
      var first_load = false;
      
      getBaDealsList(offset, first_load)
    }

   const getBaDealsList = async (offset, first_load) => {
      if (first_load){
         setShowSpinner2("none")
      } else {
         setShowSpinner2("block")
      }

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

         axios.post(`${devEnv}/api/ba/deals`,
            {
               userId: userId,
               currentDate: moment.utc().format(),
               perPage: perPage,
               offset: offset
            }
         )
            .then(response => {
               console.log('deals list', response.data);

               setActiveDealsList(
                  response.data['deals']
               )
   
               setTotalrecords(
                  response.data['total_records']['@total_records']
               )
               
               setResultsRecords(
                  response.data['deals'].length
               )
      
               setShowSpinner2("none")
            })
            .catch(error => {
               console.log('getBaDealsList error', error);
               setShowSpinner2("none")
            })
      }
   }

   const getBaChartAllDealsTotalsSales = async () => {
      setShowSpinner("block")

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

         let month = []
         let monthNoDuplicates = []
         let monthWord = []
         let data = []
         let dataSet = []

         await axios.get(`${devEnv}/api/ba/all-deals/totals/${userId}`)
            .then(response => {
               console.log('all deals totals', response.data);

               setYear(response.data[0]['year'])

               for (let obj of response.data) {
                  month.push(obj.month)

                  // console.log('total sales', obj.total_sales.toFixed(2));

                  var letters = "0123456789ABCDEF";
                  var color = '#';
                  for (var i = 0; i < 6; i++)
                     color += letters[(Math.floor(Math.random() * 16))];

                  // data.push(parseFloat(obj.total_sales).toFixed(2))
                  // console.log('data array', data);

                  dataSet.push({
                     label: obj.product_title,
                     backgroundColor: [color],
                     borderColor: 'rgba(0,0,0,1)',
                     data: [parseFloat(obj.total_sales).toFixed(2)]
                  })
               }

               monthNoDuplicates = [...new Set(month)];
               console.log('labels', monthNoDuplicates);

               for (var item of monthNoDuplicates) {
                  switch (item) {
                     case 1:
                        monthWord.push('Jan');
                        break;
                     case 2:
                        monthWord.push('feb');
                        break;
                     case 3:
                        monthWord.push('Mar');
                        break;
                     case 4:
                        monthWord.push('Apr');
                        break;
                     case 5:
                        monthWord.push('May');
                        break;
                     case 6:
                        monthWord.push('Jun');
                        break;
                     case 7:
                        monthWord.push('Jul');
                        break;
                     case 8:
                        monthWord.push('Aug');
                        break;
                     case 9:
                        monthWord.push('Sep');
                        break;
                     case 10:
                        monthWord.push('Oct');
                        break;
                     case 11:
                        monthWord.push('Nov');
                        break;
                     case 12:
                        monthWord.push('Dec');
                        break;
                  }
               }

               console.log('month word', monthWord);

               setDataChart({
                  labels: monthWord,
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

               setShowSpinner("none")
            })
            .catch(error => {
               console.log('getBaChartAllDealsTotalsSales error', error);
               setShowSpinner("none")
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

   const checkStripeSkuStock = () => {
      axios.get(`${devEnv}/api/check-stripe-sku/${"sku_IIx9ovOYhU3yne"}`)
         .then(response => {
            console.log('stripe sku', response.data);
         })
         .catch(error => {
            console.log('checkSkuStock error', error);

         })
   }

   useEffect(() => {
      getBaChartAllDealsTotalsSales()

      var offset = 0;
      var first_load = true;

      getBaDealsList(offset, first_load)
   }, [])

   return (
      <div className="business-admin-main-wrapper">
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
                           width={150}
                           height={40}
                           options={{
                              title: {
                                 display: true,
                                 text: `Product deals totals per month in ${year}`,
                                 fontSize: 15
                              },
                              legend: {
                                 display: true,
                                 position: 'right'
                              },
                              responsive: true,
                              maintainAspectRatio: false
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

                  {/* <div className="check-sku-inventory">
                     <button type="button" onClick={checkStripeSkuStock}>Check SKU Stock</button>
                  </div> */}

                  <div className="active-deals-wrapper">
                     <div className="title">
                        <h2>Deals List</h2>
                     </div>

                     {showSpinner2 === "none" ? 
                        (
                           <table id='active-deals-table'>
                              <tbody>
                                 <tr>{tableHeaderActiveDeals()}</tr>
                                 {acitveDealsItems()}
                              </tbody>
                           </table>                     
                        ):
                        (
                           <div>
                              <table id='active-deals-table'>
                                 <tbody>
                                    <tr>{tableHeaderActiveDeals()}</tr>
                                 </tbody>
                              </table>    

                              <div className="spinner2" style={{ display: showSpinner2 }}>
                                 <FontAwesomeIcon icon="spinner" spin /><p>Loading...</p>
                              </div> 
                           </div>
                        )
                     }

                     <div className="results-pagination">
                        <p>{`Results: ${resultsRecords} records`}</p>

                        <Pagination
                           prevPageText='<'
                           nextPageText='>'
                           firstPageText='<<'
                           lastPageText='>>'
                           activePage={activePage}
                           itemsCountPerPage={perPage}
                           totalItemsCount={totalRecords}
                           pageRangeDisplayed={pageRange}
                           onChange={handlePageChange}
                        />
                     </div>
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
         <td>{props.item.product_title}</td>
         <td>{props.item.sales}</td>
         <td>{`$${props.item.total_sales.toFixed(2)}`}</td>
      </tr>
   )
}