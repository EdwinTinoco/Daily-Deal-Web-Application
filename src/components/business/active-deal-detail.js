import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

import NavigationBar from '../navigation-bar/navigation-bar'

const state = {
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

export default function ActiveDealDetail(props) {
   const [dealId, setDealId] = useState(props.match.params.slug)
   const [deal, setDeal] = useState({})

   const getDeal = () => {
      axios.get(`http://localhost:5000/api/activate-deal/detail/${dealId}`)
         .then(response => {
            console.log('active deal product', response.data);

            setDeal(response.data[0])
         })
         .catch(error => {
            console.log('getDeal error', error);
         })
   }

   useEffect(() => {
      getDeal()
   }, [])

   const {
      deal_id,
      deal_user_id,
      deal_started_date,
      deal_finished_date,
      deal_status,
      product_title,
      product_price,
      stock_quantity
   } = deal

   return (
      <div className="deal-detail-main-wrapper">
         <NavigationBar />

         <div className="deal-detail-info-charts">
            <div className="deal-detail-info">
               <p>{product_title}</p>
               <p>{deal_started_date}</p>
               <p>{deal_finished_date}</p>
               <p>{product_price}</p>
               <p>{stock_quantity}</p>
               <p>{deal_status}</p>
            </div>

            <div className="charts">
               <Line
                  data={state}
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

      </div>
   )
}