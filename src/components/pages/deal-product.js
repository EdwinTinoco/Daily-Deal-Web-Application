import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';
import moment from 'moment';
import DateCountdown from 'react-date-countdown-timer';
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { devEnv } from "../../helpers/dev-env"

const stripePromise = loadStripe("pk_test_51HTxLRAFD2E6aSKk4f3OQMDwGevL1dXK2Sd0dL0qZYx5CXbYcOghi8ste5kVZbJGuUeGO1EjFxhd9hvmp5NupDrN00hRF1kuNL")

const Message = (props) => (
   <section>
      <p>{props.message}</p>
      <Link to={`/deal/product/${props.dealId}`}>Back to the Amazing Deal</Link>
   </section>
);

export default function DealProduct(props) {
   const [isLoading, setIsLoading] = useState(true)
   const [showSpinner, setShowSpinner] = useState("none")
   const [user, setUser] = useState({})
   const [dealId] = useState(props.match.params.slug)
   const [productDeal, setProductDeal] = useState({})
   const [currentStock, setCurrentStock] = useState()
   const [message, setMessage] = useState("");


   const handleBuyButton = async (e) => {
      setShowSpinner("block")

      getCurrentStock()

      if (currentStock === undefined || currentStock === "") {
         alert('There was a issue with the product stock. Try later')
         setShowSpinner("none")

      } else if (currentStock < 1) {
         alert("We're sorry you missed out on this deal today! Check back for future deals.")
         setShowSpinner("none")

      } else if (moment().format() > productDeal.deal_finished_date) {
         alert("We're sorry the deal time is over. Check back for future deals.")
         setShowSpinner("none")

      } else if (Cookies.get("_sb%_user%_session") === undefined) {
         setUser({})

         alert("You must log in to make a purchase. If you don't have an account click in Sign Up")
         setShowSpinner("none")

      } else {
         const checkPurchaseMessage = await axios.post(`${devEnv}/api/user/check-purchase`,
            {
               userId: user.user_id,
               dealId: dealId
            })
            .catch(error => {
               console.log('check purchase error', error);
            })

         console.log('checkpurchase', checkPurchaseMessage.data);

         if (checkPurchaseMessage.data["@message"] === "The user already has a purchase") {
            alert('You already made a purchase. You can only make one purchase per deal.')
            setShowSpinner("none")

         } else {
            const stripe = await stripePromise;

            let subtotal = 0
            subtotal = productDeal.product_price
            console.log('subtotal', subtotal);

            let taxes = 0
            taxes = (parseFloat(subtotal) * 0.0715).toFixed(2)
            console.log('taxes', taxes);

            let total = 0
            total = (parseFloat(subtotal) + parseFloat(taxes)).toFixed(2)
            console.log('total', total);

            const response = await fetch(`${devEnv}/create-session`, {
               method: "POST",
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  "productId": productDeal.product_id,
                  "productName": productDeal.product_title,
                  "productImage": productDeal.picture_product,
                  "productDescription": productDeal.product_description,
                  "stripeProductId": productDeal.product_stripe_id,
                  "customerUserId": user.user_id,
                  "customerEmail": user.user_email,
                  "stripeCustomerId": user.user_stripe_customer_id,
                  "dealId": dealId,
                  "saleDate": moment().format(),
                  "subtotal": subtotal,
                  "taxes": taxes,
                  "total": total,
                  "shippingTypeTitle": productDeal.shipping_type_title
               })
            });

            const session = await response.json();
            console.log('response from stripe backend', session);

            setShowSpinner("none")

            const result = await stripe.redirectToCheckout({
               sessionId: session.id,
            });

            if (result.error) {
               console.log('result error', result.error.message);

               setMessage(result.error.message)
            }
         }
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

         axios.get(`${devEnv}/api/user/${userId}`)
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

   const getCurrentStock = async () => {
      await axios.get(`${devEnv}/api/check-stock-left/${dealId}`)
         .then(response => {
            setCurrentStock(response.data['stock_left'])
         })
         .catch(error => {
            console.log('getCurrentStock error', error);
         })
   }

   const getProductDeal = async () => {
      console.log('deal id', dealId);

      await axios.get(`${devEnv}/deal/product/${dealId}`)
         .then(response => {
            console.log('product deal', response.data);
            console.log('current stock left', response.data[0].stock_left);

            setIsLoading(false)

            setProductDeal(response.data[0])
            setCurrentStock(response.data[0].stock_left)
         })
         .catch(error => {
            console.log('getProductDeal error', error);
         })
   }

   useEffect(() => {
      getCurrentUser()

      getProductDeal()

      // const updateCurrentStock = setInterval(() => {
      //    getCurrentStock()
      // }, 100000);

      const query = new URLSearchParams(window.location.search);

      if (query.get("success")) {
         setMessage("Order placed! You will receive an email confirmation.");
      }

      if (query.get("canceled")) {
         setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
         );
      }

      // return () => clearInterval(updateCurrentStock);
   }, [])

   const {
      deal_id,
      deal_finished_date,
      picture_product,
      product_title,
      product_description,
      product_compare_price,
      product_price,
      business_logo_image
   } = productDeal


   return (
      <div className="main-wrapper">
         {isLoading ?
            (
               <div className="isloading">
                  <FontAwesomeIcon icon="spinner" spin />
                  <p>Loading...</p>
               </div>
            )
            :
            (
               <div className="deal-product-main-wrapper">
                  {/* {message ? (
            <Message dealId={deal_id} message={message} />
         )
            :
            ( */}
                  <div className="content">
                     <div className="deal-product-detail-main-wrapper">
                        <div className="business-logo">
                           <img src={business_logo_image} alt="business-logo" />
                        </div>

                        <div className="image">
                           <img src={picture_product} alt="image" />
                        </div>

                        <div className="title-description">
                           <p className="title">{product_title}</p>
                           <p className="description">{product_description}</p>
                        </div>

                        <div className="price-stock">
                           <p className="compare-price">${product_compare_price}</p>
                           <p className="price">${product_price}</p>

                           <div className="stock">
                              <p className="number">{currentStock}</p>

                              <p className="left">LEFT</p>
                           </div>
                        </div>

                        {/* <div className="countdown-deal">
                        <p>Deal ends in...</p>

                        <DateCountdown dateTo={'2020-09-26 08:30:10'} callback={() => 1 + 1} />
                        </div> */}

                        {Object.entries(user).length > 0 ?
                           (
                              <div className="buy-button">
                                 <button id="checkout-button" role="link" onClick={handleBuyButton}>
                                    BUY
                                 </button>

                                 <div className="spinner" style={{ display: showSpinner }}>
                                    <FontAwesomeIcon icon="spinner" spin />
                                    <p>Loading...</p>
                                 </div>
                              </div>
                           )
                           :
                           (
                              <div className="buy-link">
                                 <Link to={{ pathname: "/auth/customer", state: { dealId: dealId } }}>
                                    <div className="button">
                                       <p>BUY</p>
                                    </div>
                                 </Link>
                              </div>
                           )
                        }

                        {Object.entries(user).length < 1 ?
                           (
                              <div className="links-wrapper">
                                 <div className="link">
                                    <Link to={{ pathname: "/auth/customer", state: { dealId: dealId } }}>SIGN IN</Link>
                                 </div>

                                 <div className="link">
                                    <Link to={{ pathname: "/signup/customer", state: { dealId: dealId } }}>SIGN UP</Link>
                                 </div>
                              </div>
                           )
                           :
                           null
                        }
                     </div>
                  </div>
                  {/* )} */}
               </div>
            )
         }
      </div>
   )
}