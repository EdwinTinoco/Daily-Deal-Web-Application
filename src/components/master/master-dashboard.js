import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import Pagination from "react-js-pagination";

import NavigationBar from "../navigation-bar/navigation-bar"
import AllActiveDealsList from './all-active-deals-list'
import { devEnv } from "../../helpers/dev-env"

// const state = {
//    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//    datasets: [
//       {
//          label: 'Nike',
//          backgroundColor: '#facf57',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [0.0, 0.0, 0.0, 107.14, 59.99, 161.78]
//       },
//       {
//          label: 'Collection SS',
//          backgroundColor: '#8d8c8c',
//          borderColor: 'rgba(0,0,0,1)',
//          data: [0.0, 0.0, 0.0, 0.0, 70.69, 214.28]
//       }
//    ]
// }

export default function MasterDashboard(props) {
   // const [userId, setUserId] = useState()
   const [allActiveDeals, setAllActiveDeals] = useState([])
   const [activeDealsTotals, setActiveDealsTotals] = useState([])
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

      getAllActiveDealsList(offset, first_load, yearToConsult)
    }

   const getAllActiveDealsList = async (offset, first_load, yearToConsult) => {
      if (first_load){
         setShowSpinner2("none")
      }else {
         setShowSpinner2("block")
      }

      await axios.post(`${devEnv}/api/ma/all-active-deals`,
      {
         currentDate: moment.utc().format(),
         perPage: perPage,
         offset: offset,
         yearSelected: yearToConsult
      })
      .then(response => {
         console.log('all active deals', response.data);

         setAllActiveDeals(
            response.data['all_deals']
         )
         
         setTotalrecords(
            response.data['total_records']['@total_records']
         )
         
         setResultsRecords(
            response.data['all_deals'].length
         )

         setShowSpinner2("none")
      })
      .catch(error => {
         console.log('getAllActiveDealsList error', error);
         setShowSpinner2("none")
      })
   }

   const getMaChartAllDealsTotalsSalesMonth = async (yearToConsult) => {
      setShowSpinner("block")
      
      let labels = []
      let business = []
      let businessNoDuplicates = []
      let data = []
      let dataSet = []
      var currentMonth = moment().month();
      var currentYear = parseInt(moment().format('YYYY'));

      console.log('yeart to consult, current year', yearToConsult, currentYear, currentMonth);

      await axios.get(`${devEnv}/api/ma/chart/totals-sales-month/${yearToConsult}`)
         .then(response => {
            console.log('all ma deals totals', response.data);

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

            business = []
            businessNoDuplicates = []
            for (var x of response.data) {
               business.push(x.user_name)
            }
            businessNoDuplicates = [...new Set(business)];

            console.log('yeart to consult, current year', yearToConsult, currentYear, currentMonth);

            dataSet = []
            for (var bname of businessNoDuplicates){
               if (yearToConsult < currentYear){
                  console.log('entro year minor than current year');
                  data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
               } else if (yearToConsult === currentYear){
                  console.log('entro year igual than current year');
                  data = []
               }
               
               for (let obj of response.data) {
                  if (bname === obj.user_name){

                     switch (obj.month_sales) {
                        case 1:    
                        if (yearToConsult < currentYear){
                           data[0] = parseFloat(obj.total_sales).toFixed(2) 
                        } else if (yearToConsult === currentYear){
                           data.push(parseFloat(obj.total_sales).toFixed(2) )
                        }                
                           break;
                        case 2:
                           data[1] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 3:
                           data[2] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 4:
                           data[3] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 5:
                           data[4] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 6:
                           data[5] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 7:
                           data[6] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 8:
                           data[7] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 9:
                           data[8] = parseFloat(obj.total_sales).toFixed(2) 
                           break;
                        case 10:
                           data[9] = parseFloat(obj.total_sales).toFixed(2)        
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
                  label: bname,
                  backgroundColor: colors,
                  borderColor: 'rgba(0,0,0,1)',
                  data: data
               })
            }

            setDataChart({
               labels: labels,
               datasets: dataSet
            }) 

            setShowSpinner("none")
         })
         .catch(error => {
            console.log('getMaChartAllDealsTotalsSalesMonth error', error);
            setShowSpinner("none")
         })
   }

   const getPanelTotalSalesBusiness = async(yearToConsult) => {
      await axios.get(`${devEnv}/api/ma/panel/total-sales-business/${yearToConsult}`)
         .then(response => {
            setActiveDealsTotals(
               response.data
            )
         }).catch(error => {
            console.log('getTotalSalesBusiness error', error);
         })
   }

   const tableHeaderAllActiveDeals = () => {
      let headerAllActiveDeals = ["Deal Product", "Business", "Deal started Date", "Deal finished Date", "Stock", "Stock left", "Price", "Sales", "Total Sales", "Status"]

      return headerAllActiveDeals.map((temp, index) => {
         return <th key={index}>{temp.toUpperCase()}</th>
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
      let headerActiveDealsTotals = ['Name', 'Total']

      return headerActiveDealsTotals.map((temp, index) => {
         return <th key={index}>{temp.toUpperCase()}</th>
      })
   }

   const acitveDealsTotals = () => {
      return activeDealsTotals.map(item => {
         return (
            <ActiveDealsTotalsSalesList
               key={item.user_id}
               item={item}
            />
         )
      })
   }

   useEffect(() => {
      var currentYear = parseInt(moment().format('YYYY'));
      setYearSelected(currentYear)

      getMaChartAllDealsTotalsSalesMonth(currentYear)
      getPanelTotalSalesBusiness(currentYear)

      var offset = 0;
      var first_load = true;

      getAllActiveDealsList(offset, first_load, currentYear)
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
                           width={150}
                           height={40}
                           options={{
                              title: {
                                 display: true,
                                 text: `Sales p/month by Business in ${yearSelected}`,
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
                        <div className="year-search">
                           <label htmlFor="year_selected">Select Year:</label>
                           <select className='new-entry-input'
                              value={yearSelected}
                              onChange={({ target }) => {
                                 setYearSelected(parseInt(target.value))

                                 getMaChartAllDealsTotalsSalesMonth(parseInt(target.value))
                                 getPanelTotalSalesBusiness(parseInt(target.value))

                                 var offset = 0;
                                 var first_load = true;
                                 getAllActiveDealsList(offset, first_load, parseInt(target.value))
                              }}
                              id="year_selected"
                           >
                              <option value={parseInt(moment().format('YYYY'))}>{parseInt(moment().format('YYYY'))}</option>
                              <option value={2020}>{2020}</option>
                           </select>
                        </div>
                        <div className="deals-total-sales">
                           <div className="title">
                              <h2>Total Sales p/Business</h2>
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
                    
                     {showSpinner2 === "none" ? 
                        (
                           <table id='active-deals-table'>
                              <tbody>
                                 <tr>{tableHeaderAllActiveDeals()}</tr>
                                 {allAcitveDealsItems()}
                              </tbody>     
                           </table>     
                        ):
                        (
                           <div>
                              <table id='active-deals-table'>
                                 <tbody>
                                    <tr>{tableHeaderAllActiveDeals()}</tr>
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
      <tr>
         <td>{props.item.user_name}</td>         
         <td>{`$${props.item.total_sales.toFixed(2)}`}</td>
      </tr>
   )
}