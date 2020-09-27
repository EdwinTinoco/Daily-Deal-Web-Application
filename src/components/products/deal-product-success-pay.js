import React, { useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';

export default function DealProductSuccessPay(props) {
   const [dealId] = useState(props.match.params.slug)
   const [productDeal, setProductDeal] = useState({})


   const getProductDeal = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []
      let userId = ""

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

         userId = userIdArr.join('')
      }

      axios.get(`http://localhost:5000/deal/product/${dealId}`)
         .then(response => {
            console.log('product deal', response.data);

            setProductDeal(response.data[0])
         })
         .catch(error => {
            console.log('insertNewSale axios get error', error);
         })
   }

   useEffect(() => {
      getProductDeal()
   }, [])


   return (
      <div className="success-payment">
         <h1>Success Payment!!</h1>
         <h1>{dealId}</h1>
      </div>
   )
}