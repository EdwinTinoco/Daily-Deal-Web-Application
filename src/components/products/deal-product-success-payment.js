import React, { useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'


export default function DealProductSuccessPayment(props) {
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
         <div className="center">
            <div className="logo">
               <img src={Logo} alt="kudu-logo" />
            </div>

            <div className="thanks">
               <p>Thank you!</p>
            </div>

            <div className="order">
               <p>Your order was placed</p>
            </div>

            <div className="email">
               <p>You will receive an email confirmation</p>
               {/* <p>{dealId}</p> */}
            </div>

         </div>
      </div>
   )
}