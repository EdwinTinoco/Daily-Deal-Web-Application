import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DealProductDetail from "../products/deal-product-detail"

export default class DealProduct extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dealProduct: {
            title: "VOZZI TEE",
            price: 19.00,
            image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
            description: "Premium cotton fabric. Comfortable and light. Get it while it lasts!",
            stock: 50
         }
      }
   }

   getDealProduct() {
      // Aqui va axios get para traernos el producto de la API
   }

   // componentDidMount(){
   //    getDealProduct()
   // }

   render() {
      return (
         <div className="deal-product-main-wrapper">
            <div className="content">
               <DealProductDetail dealProduct={this.state.dealProduct} />

               <div className="buy-button">
                  <button type="button">BUY</button>
               </div>

               <div className="links-wrapper">
                  <div className="link">
                     <Link to="/auth">SIGN IN</Link>
                  </div>

                  <div className="link">
                     <Link to="/signup">SIGN UP</Link>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}