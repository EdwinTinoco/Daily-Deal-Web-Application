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
   // const [activeDealsTotals, setActiveDealsTotals] = useState([])
   // const [activeDealsGranTotal, setActiveDealsGranTotal] = useState(0)
   const [dataChart, setDataChart] = useState({})
   const [showSpinner, setShowSpinner] = useState("none")
   const [showSpinner2, setShowSpinner2] = useState("none")
   const [activePage, setActivePage] = useState(1)
   const [perPage] = useState(15)
   const [pageRange] = useState(5)
   const [totalRecords, setTotalrecords] = useState(0)
   const [resultsRecords, setResultsRecords] = useState(0)
   const [yearSelected, setYearSelected] = useState()

   const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);

      var offset = (pageNumber - 1) * perPage
      var first_load = false;
      var yearToConsult = yearSelected
      
      getBaDealsList(offset, first_load, yearToConsult)
    }

   const getBaDealsList = async (offset, first_load, yearToConsult) => {
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
               offset: offset,
               yearSelected: yearToConsult
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

   const getBaChartAllDealsTotalsSalesMonth = async (yearToConsult) => {
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

         let labels = []
         let deals = []
         let dealsNoDuplicates = []
         let data = []
         let dataSet = []
         var currentMonth = moment().month();
         var currentYear = parseInt(moment().format('YYYY'));

         await axios.post(`${devEnv}/api/ba/all-deals/totals`,
         {
            userId: userId,
            yearToConsult: yearToConsult
         })
            .then(response => {
               console.log('ba chart all deals totals', response.data);

               if (yearToConsult < currentYear){
                  labels = []
                  labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
               }else if (yearToConsult === currentYear){
                  switch (currentMonth) {
                     case 0:
                        labels = []
                        labels.push('Jan');
                        break;
                     case 1:
                        labels = []
                        labels.push('Jan', 'Feb');
                        break;
                     case 2:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar');
                        break;
                     case 3:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr');
                        break;
                     case 4:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May');
                        break;
                     case 5:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun');
                        break;
                     case 6:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul');
                        break;
                     case 7:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug');
                        break;
                     case 8:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep');
                        break;
                     case 9:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct');
                        break;
                     case 10:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov');
                        break;
                     case 11:
                        labels = []
                        labels.push('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
                        break;
                  }
               }

               deals = []
               dealsNoDuplicates = []
               for (var x of response.data) {
                  deals.push(x.product_title)
               }
               dealsNoDuplicates = [...new Set(deals)];

               console.log('yeart to consult, current year', yearToConsult, currentYear, currentMonth);

               dataSet = []
               for (var pname of dealsNoDuplicates){
                  if (yearToConsult < currentYear){
                     console.log('entro year minor than current year');
                     data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
                  } else if (yearToConsult === currentYear){
                     console.log('entro year igual than current year');
                     data = []
                  }
                  
                  for (let obj of response.data) {
                     if (pname === obj.product_title){

                        switch (obj.month_sales) {
                           case 1:    
                              if (yearToConsult < currentYear){
                                 data[0] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }                
                              break;
                           case 2:
                              if (yearToConsult < currentYear){
                                 data[1] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 3:
                              if (yearToConsult < currentYear){
                                 data[2] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }   
                              break;
                           case 4:
                              if (yearToConsult < currentYear){
                                 data[3] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 5:
                              if (yearToConsult < currentYear){
                                 data[4] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 6:
                              if (yearToConsult < currentYear){
                                 data[5] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 7:
                              if (yearToConsult < currentYear){
                                 data[6] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 8:
                              if (yearToConsult < currentYear){
                                 data[7] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 9:
                              if (yearToConsult < currentYear){
                                 data[8] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }  
                              break;
                           case 10:
                              if (yearToConsult < currentYear){
                                 data[9] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }      
                              break;
                           case 11:
                              if (yearToConsult < currentYear){
                                 data[10] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }   
                              break;
                           case 12:
                              if (yearToConsult < currentYear){
                                 data[11] = parseFloat(obj.total_sales).toFixed(2) 
                              } else if (yearToConsult === currentYear){
                                 data.push(parseFloat(obj.total_sales).toFixed(2) )
                              }   
                              break;
                        }
                     }
                  }

                  console.log('data', data);
                  
                  var colors = []
                  for (var j=0; j < labels.length; j++){
                     var letters = "0123456789ABCDEF";
                     var color = '#';
                     for (var i = 0; i < 6; i++)
                        color += letters[(Math.floor(Math.random() * 16))];
                        colors.push(color)
                  }

                  dataSet.push({
                     label: pname,
                     backgroundColor: colors,
                     borderColor: 'rgba(0,0,0,1)',
                     data: data
                  })
               }

               setDataChart({
                  labels: labels,
                  datasets: dataSet
               }) 

               // let granTotal = 0
               // for (var total of response.data) {
               //    granTotal += parseFloat(total.total_sales)
               // }

               // setActiveDealsGranTotal(granTotal.toFixed(2))

               // setActiveDealsTotals(
               //    response.data
               // )

               setShowSpinner("none")
            })
            .catch(error => {
               console.log('getBaChartAllDealsTotalsSalesMonth error', error);
               setShowSpinner("none")
            })
      }
   }

   const tableHeaderActiveDeals = () => {
      let headerActiveDeals = ["Product", "Deal URL", "Deal Started Date", "Deal Finished Date", "Stock", "Stock left", "Price", "Sales", "Total Sales", "Shipping Type", "Deal Status"]

      return headerActiveDeals.map((item, index) => {
         return <th key={index}>{item.toUpperCase()}</th>
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

   // const tableHeaderActiveDealsTotals = () => {
   //    let headerActiveDealsTotals = ['Product Title', 'Sales', 'Total']

   //    return headerActiveDealsTotals.map((item, index) => {
   //       return <th key={index}>{item.toUpperCase()}</th>
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

   // const checkStripeSkuStock = () => {
   //    axios.get(`${devEnv}/api/check-stripe-sku/${"sku_IIx9ovOYhU3yne"}`)
   //       .then(response => {
   //          console.log('stripe sku', response.data);
   //       })
   //       .catch(error => {
   //          console.log('checkSkuStock error', error);

   //       })
   // }

   useEffect(() => {
      var currentYear = parseInt(moment().format('YYYY'));
      setYearSelected(currentYear)

      getBaChartAllDealsTotalsSalesMonth(currentYear)

      var offset = 0;
      var first_load = true;

      getBaDealsList(offset, first_load, currentYear)
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
                     <div className="business-year-search">
                        <div className="business-name">
                           <p>{}</p>
                        </div>

                        <div className="year-search">
                           <label htmlFor="year_selected">Search:</label>
                           <select className='new-entry-input'
                              value={yearSelected}
                              onChange={({ target }) => {
                                 setYearSelected(parseInt(target.value))

                                 getBaChartAllDealsTotalsSalesMonth(parseInt(target.value))

                                 var offset = 0;
                                 var first_load = true;
                                 getBaDealsList(offset, first_load, parseInt(target.value))
                              }}
                              id="year_selected"
                           >
                              <option value={parseInt(moment().format('YYYY'))}>{parseInt(moment().format('YYYY'))}</option>
                              <option value={2020}>{2020}</option>
                           </select>
                        </div>
                     </div>

                     <div className="chart-deals">
                        <Bar
                           data={dataChart}
                           width={150}
                           height={40}
                           options={{
                              title: {
                                 display: true,
                                 text: `Totals sales per deal per month in ${yearSelected}`,
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
                        {/* <div className="gran-total-sales">
                           <div className="title">
                              <p>Total Sales</p>
                           </div>

                           <div className="total">
                              <p>{`$${activeDealsGranTotal}`}</p>
                           </div>
                        </div> */}

                        {/* <div className="deals-total-sales-list">
                           <div className="title">
                              <h2>Deals Sales</h2>
                           </div>

                           <table id='totals-deals-sales-table'>
                              <tbody>
                                 <tr>{tableHeaderActiveDealsTotals()}</tr>
                                 {acitveDealsTotals()}
                              </tbody>
                           </table>
                        </div> */}
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

// const ActiveDealsTotalsSalesList = (props) => {
//    return (
//       <tr>
//          <td>{props.item.product_title}</td>
//          <td>{props.item.sales}</td>
//          <td>{`$${props.item.total_sales.toFixed(2)}`}</td>
//       </tr>
//    )
// }