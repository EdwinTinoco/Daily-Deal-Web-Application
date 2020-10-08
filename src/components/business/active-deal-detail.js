import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { CSVLink, CSVDownload } from "react-csv";

import NavigationBar from '../navigation-bar/navigation-bar'


export default function ActiveDealDetail(props) {
   const [dealId] = useState(props.match.params.slug)
   const [deal, setDeal] = useState({})
   const [sales, setSales] = useState([])

   const [csvHeadersShippingToCustomer] = useState([
      { label: "Customer Name", key: "user_name" },
      { label: "Customer Email", key: "user_email" },
      { label: "Sale Date", key: "sales_date" },
      { label: "Product", key: "product_title" },
      { label: "SQU", key: "product_squ" },
      { label: "Subtotal", key: "sales_subtotal" },
      { label: "Taxes", key: "sales_taxes" },
      { label: "Total", key: "sales_total" },
      { label: "Shipping Type", key: "shipping_type_title" },
      { label: "Shipping Name", key: "shipping_name" },
      { label: "Shipping Address Line 1", key: "shipping_line_1" },
      { label: "Shipping Address Line 2", key: "shipping_line_2" },
      { label: "City", key: "shipping_city" },
      { label: "State", key: "shipping_state" },
      { label: "Zip code", key: "shipping_zip_code" },
      { label: "Country", key: "shipping_country" },
   ])

   const [csvHeadersPickupToTheStore] = useState([
      { label: "Customer Name", key: "user_name" },
      { label: "Customer Email", key: "user_email" },
      { label: "Sale Date", key: "sales_date" },
      { label: "Product", key: "product_title" },
      { label: "SQU", key: "product_squ" },
      { label: "Subtotal", key: "sales_subtotal" },
      { label: "Taxes", key: "sales_taxes" },
      { label: "Total", key: "sales_total" },
      { label: "Shipping Type", key: "shipping_type_title" },
      { label: "Store Name", key: "pickup_name" },
      { label: "Address Line 1", key: "pickup_line_1" },
      { label: "Address Line 2", key: "pickup_line_2" },
      { label: "City", key: "pickup_city" },
      { label: "State", key: "pickup_state" },
      { label: "Zip code", key: "pickup_zip_code" },
      { label: "Country", key: "pickup_country" },
   ])

   const [csvHeadersNotApplicable] = useState([
      { label: "Customer Name", key: "user_name" },
      { label: "Customer Email", key: "user_email" },
      { label: "Sale Date", key: "sales_date" },
      { label: "Product", key: "product_title" },
      { label: "SQU", key: "product_squ" },
      { label: "Subtotal", key: "sales_subtotal" },
      { label: "Taxes", key: "sales_taxes" },
      { label: "Total", key: "sales_total" },
      { label: "Shipping Type", key: "shipping_type_title" }
   ])


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
      let headerDealSales = []

      if (deal.shipping_type_title === "Shipping to customer's address") {
         headerDealSales = ["Customer Name", "Customer Email", "Sale Date", "Product", "Subtotal", "taxes", "Total", "Shipping Type",
            "Shipping Name", "Shipping Address Line 1", 'Shipping Address Line 2', "City", "State", "Zip Code", "Country"]

      } else if (deal.shipping_type_title === "Pick up to the store") {
         headerDealSales = ["Customer Name", "Customer Email", "Sale Date", "Product", "Subtotal", "taxes", "Total", "Shipping Type",
            , "Store Name", "Address Line 1", 'Address Line 2', "City", "State", "Zip Code", "Country"]

      } else if (deal.shipping_type_title === "Not applicable") {
         headerDealSales = ["Customer Name", "Customer Email", "Sale Date", "Product", "Subtotal", "taxes", "Total", "Shipping Type"]
      }

      return headerDealSales.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   const DealSales = () => {
      return sales.map(item => {
         if (deal.shipping_type_title === "Shipping to customer's address") {
            return (
               <tr key={item.sales_id}>
                  <td>{item.user_name}</td>
                  <td>{item.user_email}</td>
                  <td>{item.sales_date}</td>
                  <td>{item.product_title}</td>
                  <td>{`$${item.sales_subtotal}`}</td>
                  <td>{`$${item.sales_taxes}`}</td>
                  <td>{`$${item.sales_total}`}</td>
                  <td>{item.shipping_type_title}</td>
                  <td>{item.shipping_name}</td>
                  <td>{item.shipping_line_1}</td>
                  <td>{item.shipping_line_2}</td>
                  <td>{item.shipping_city}</td>
                  <td>{item.shipping_state}</td>
                  <td>{item.shipping_zip_code}</td>
                  <td>{item.shipping_country}</td>
               </tr>
            )
         } else if (deal.shipping_type_title === "Pick up to the store") {
            return (
               <tr key={item.sales_id}>
                  <td>{item.user_name}</td>
                  <td>{item.user_email}</td>
                  <td>{item.sales_date}</td>
                  <td>{item.product_title}</td>
                  <td>{`$${item.sales_subtotal}`}</td>
                  <td>{`$${item.sales_taxes}`}</td>
                  <td>{`$${item.sales_total}`}</td>
                  <td>{item.shipping_type_title}</td>
                  <td>{item.pickup_name}</td>
                  <td>{item.pickup_line_1}</td>
                  <td>{item.pickup_line_2}</td>
                  <td>{item.pickup_city}</td>
                  <td>{item.pickup_state}</td>
                  <td>{item.pickup_zip_code}</td>
                  <td>{item.pickup_country}</td>
               </tr>
            )
         } else {
            return (
               <tr key={item.sales_id}>
                  <td>{item.user_name}</td>
                  <td>{item.user_email}</td>
                  <td>{item.sales_date}</td>
                  <td>{item.product_title}</td>
                  <td>{`$${item.sales_subtotal}`}</td>
                  <td>{`$${item.sales_taxes}`}</td>
                  <td>{`$${item.sales_total}`}</td>
                  <td>{item.shipping_type_title}</td>
               </tr>
            )
         }
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


         <div className="deal-sales-details-list">
            <div className="title-export-csv">
               <h2>Sales Details</h2>

               <div className="export-csv">
                  <CSVLink
                     data={sales}
                     headers={deal.shipping_type_title === "Shipping to customer's address" ?
                        csvHeadersShippingToCustomer
                        : deal.shipping_type_title === "Pick up to the store" ?
                           csvHeadersPickupToTheStore
                           : csvHeadersNotApplicable
                     }
                     filename={"my-file.csv"}
                  >
                     <p>Export to CSV</p>
                  </CSVLink>
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