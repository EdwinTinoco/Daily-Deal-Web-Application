import React, { useState, useEffect } from "react"
import axios from "axios";
import moment from 'moment';

export default function DealProductSuccessPay(props) {
   const [dealId] = useState(props.match.params.slug)
   const [productDeal, setProductDeal] = useState({})


   const insertNewSale = () => {
      axios.get(`http://localhost:5000/deal/product/${dealId}`)
         .then(response => {
            console.log('product deal', response.data);

            setProductDeal(response.data[0])

            let subtotal = 0
            subtotal = response.data[0].product_price

            let taxes = 0
            taxes = subtotal * 0.12

            let total = 0
            total = (subtotal + taxes).toFixed(2)

            axios.post('http://localhost:5000/api/sales/new-sale', {
               productId: response.data[0].product_id,
               customerUserId: 14,
               dealId: dealId,
               saleDate: moment().format(),
               subtotal: subtotal,
               taxes: taxes,
               total: total,
               shippingAddress: "test",
               stripePaymentIntentId: ""
            })
               .then(response => {
                  console.log('response new sale', response.data);
               })
               .catch(error => {
                  console.log('insertNewSale axios post', error);
               })
         })
         .catch(error => {
            console.log('insertNewSale axios get error', error);
         })
   }

   useEffect(() => {
      insertNewSale()
   }, [])


   return (
      <div className="success-payment">
         <h1>Success Payment!!</h1>
         <h1>{dealId}</h1>
      </div>
   )
}