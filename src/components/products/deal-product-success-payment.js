import React, { useState, useEffect } from "react"
import axios from "axios";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DealProductSuccessPayment(props) {
   const [isLoading, setIsLoading] = useState(true)
   const [productDeal, setProductDeal] = useState({})


   const getProductDeal = () => {
      // let userCookie = Cookies.get("_sb%_user%_session")
      // let temp = 0
      // let userIdArr = []
      // let userId = ""

      // if (userCookie !== undefined) {
      //    for (var i = 0; i < userCookie.length; i++) {
      //       if (userCookie[i] == "%") {
      //          temp += 1
      //       }

      //       if (temp === 2) {
      //          if (userCookie[i] !== "%") {
      //             userIdArr.push(userCookie[i])
      //          }
      //       }
      //    }

      //    userId = userIdArr.join('')
      // }

      axios.get(`https://et-daily-deal-backend.herokuapp.com/deal/product/${props.match.params.slug}`)
         .then(response => {
            console.log('product deal', response.data);

            setIsLoading(false)

            setProductDeal(response.data[0])
         })
         .catch(error => {
            console.log('getProductDeal error', error);
         })
   }

   useEffect(() => {
      getProductDeal()
   }, [])


   return (
      <div className="succes-payment-main-wrapper">
         {isLoading ?
            (
               <div className="isloading">
                  <FontAwesomeIcon icon="spinner" spin />
                  <p>Loading...</p>
               </div>
            )
            :
            (
               <div className="success-payment">
                  <div className="center">
                     <div className="logo">
                        <img src={productDeal.business_logo_image} alt="business-logo" />
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
      </div>
   )
}