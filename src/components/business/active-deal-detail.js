import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

import NavigationBar from '../navigation-bar/navigation-bar'
import DealSalesDetails from "./deal-sales-details-list"

const stateLineChart = {
   labels: ['January', 'February', 'March',
      'April', 'May'],
   datasets: [
      {
         label: 'Rainfall',
         fill: false,
         lineTension: 0.5,
         backgroundColor: 'rgba(75,192,192,1)',
         borderColor: 'rgba(0,0,0,1)',
         borderWidth: 2,
         data: [65, 59, 80, 81, 56]
      }
   ]
}

const stateDoughnutChart = {
   labels: ['January', 'February', 'March',
      'April', 'May'],
   datasets: [
      {
         label: 'Rainfall',
         backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
         ],
         hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
         ],
         data: [65, 59, 80, 81, 56]
      }
   ]
}

export default function ActiveDealDetail(props) {
   const [dealId] = useState(props.match.params.slug)
   const [deal, setDeal] = useState({})
   const [sales, setSales] = useState([])

   const getDeal = () => {
      axios.get(`http://localhost:5000/api/active-deal/detail/${dealId}`)
         .then(response => {
            console.log('active deal product', response.data);

            setDeal(response.data[0])
         })
         .catch(error => {
            console.log('getDeal error', error);
         })
   }

   const getSales = () => {
      axios.get(`http://localhost:5000/api/sales-deal/detail/${props.match.params.slug}`)
         .then(response => {
            console.log('sales', response.data);

            setSales(response.data)
         })
         .catch(error => {
            console.log('getSales error', error);
         })
   }

   const tableHeaderADealSales = () => {
      if (deal.shipping_type_title === "Shipping to customer's address") {

         let headerDealSales = ["Customer Name", "Customer Email", "Shop Date", "Subtotal", "taxes", "Total", "Shipping Type",
            "Shipping Name", "Shipping Address Line 1", 'Shipping Address Line 2', "City", "State", "Zip Code", "Country"]

         // setHeaders([
         //    {label: "Customer Name", key: "user_name"},
         //    {label: "Customer Email", key: "user_email"},
         //    {label: "Shop Date", key: "user_email"},
         // ])

         return headerDealSales.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
      }
   }

   const DealSales = () => {
      return sales.map(item => {
         return (
            <DealSalesDetails
               key={item.deal_id}
               item={item}
            />
         )
      })
   }


   useEffect(() => {
      getDeal()
      getSales()
   }, [])

   const {
      deal_id,
      deal_user_id,
      deal_started_date,
      deal_finished_date,
      deal_url,
      deal_status,
      picture_product,
      product_title,
      product_description,
      product_price,
      shipping_type_title,
      stock_quantity,
      stock_left
   } = deal

   return (
      <div className="deal-detail-main-wrapper">
         <NavigationBar />

         <div className="deal-detail-info-charts">
            <div className="deal-detail-info">
               <div className="product-info">
                  <p className="title">Product Info</p>
                  <img className="picture" src={picture_product} alt="picture" />
                  <p className="product-title">{product_title}</p>
                  <p className="description">{product_description}</p>
                  <p className="stock">{`Stock: ${stock_quantity}`}</p>
                  <p className="stock">{`Left: ${stock_left}`}</p>
                  <p className="price">{`$${product_price}`}</p>
               </div>

               <div className="deal-info">
                  <p className="title">Deal Info</p>
                  <p className="url">{`Deal url: ${deal_url}`}</p>
                  <p className="dates">{`Created Date: ${deal_started_date}`}</p>
                  <p className="shipping">{`Shipping type: ${shipping_type_title}`}</p>
                  <p className="status">{`Deal Status: ${deal_status}`}</p>
               </div>
            </div>

            <div className="charts">
               <Line
                  data={stateLineChart}
                  options={{
                     title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                     },
                     legend: {
                        display: true,
                        position: 'right'
                     }
                  }}
               />
            </div>
         </div>

         <div className="deal-sales-details-list">
            <div className="title-export-csv">
               <h2>Sales Details</h2>

               <div className="export-csv">
                  <p>Export to csv</p>
                  <FontAwesomeIcon icon="file-excel" />
               </div>
            </div>

            <table id='deal-sales-table'>
               <tbody>
                  <tr>{tableHeaderADealSales()}</tr>
                  {DealSales()}
               </tbody>
            </table>
         </div>
      </div>
   )
}