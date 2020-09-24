import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie'
import { loadStripe } from "@stripe/stripe-js";

import DealProductDetail from "../products/deal-product-detail"

const stripePromise = loadStripe("pk_test_51HTxLRAFD2E6aSKk4f3OQMDwGevL1dXK2Sd0dL0qZYx5CXbYcOghi8ste5kVZbJGuUeGO1EjFxhd9hvmp5NupDrN00hRF1kuNL")

const Message = (props) => (
   <section>
      <p>{props.message}</p>
      <Link to={`/deal/product/${props.dealId}`}>Back to the Amazing Deal</Link>
   </section>
);

export default function DealProduct(props) {
   const [user, setUser] = useState({})
   const [dealId] = useState(props.match.params.slug)
   const [productDeal, setProductDeal] = useState({})
   const [message, setMessage] = useState("");

   const handleBuyButton = async (e) => {
      const stripe = await stripePromise;

      let subtotal = 0
      subtotal = productDeal.product_price
      console.log('subtotal', subtotal);

      let taxes = 0
      taxes = subtotal * 0.12
      console.log('taxes', taxes);

      let total = 0
      total = (subtotal + taxes).toFixed(2)
      console.log('total', total);

      const response = await fetch("http://localhost:5000/create-session", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "customerEmail": user.user_email,
            "dealId": dealId,
            "productName": productDeal.product_title,
            "productImage": productDeal.picture_product,
            "total": total
         })
      });

      const session = await response.json();
      console.log('response from stripe backend', session);


      const result = await stripe.redirectToCheckout({
         sessionId: session.id,
      });

      console.log('result', result);


      if (result.error) {
         console.log('result error', result.error.message);

         setMessage(result.error.message)
      }
      else {
         // guardar en base de datos las sales junto con el id sales de stripe

      }
   }

   const getCurrentUser = () => {
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

         let userId = userIdArr.join('')

         axios.get(`http://localhost:5000/api/user/${userId}`)
            .then(response => {
               console.log('current user', response.data);

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               console.log('getCurrentUser error', error);
            });
      }
   }

   const getProductDeal = () => {
      console.log('deal id', dealId);

      axios.get(`http://localhost:5000/deal/product/${dealId}`)
         .then(response => {
            console.log('product deal', response.data);

            setProductDeal(response.data[0])
         })
         .catch(error => {
            console.log('getProductDeal error', error);
         })
   }

   useEffect(() => {
      getCurrentUser()

      getProductDeal()

      const query = new URLSearchParams(window.location.search);

      if (query.get("success")) {
         setMessage("Order placed! You will receive an email confirmation.");
      }

      if (query.get("canceled")) {
         setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
         );
      }
   }, [])


   return (
      <div className="deal-product-main-wrapper">
         {message ? (
            <Message dealId={productDeal.deal_id} message={message} />
         )
            :
            (
               <div className="content">
                  <DealProductDetail productDeal={productDeal} />

                  {Object.entries(user).length > 0 ?
                     (
                        <div className="buy-button">
                           <button id="checkout-button" role="link" onClick={handleBuyButton}>
                              BUY
                           </button>
                        </div>
                     )
                     :
                     null
                  }

                  {Object.entries(user).length < 1 ?
                     (
                        <div className="links-wrapper">
                           <div className="link">
                              <Link to={{ pathname: "/auth/customer", state: { dealId: dealId } }}>SIGN IN</Link>
                           </div>

                           <div className="link">
                              <Link to="/signup/customer">SIGN UP</Link>
                           </div>
                        </div>
                     )
                     :
                     null
                  }
               </div>
            )}
      </div>
   )
}