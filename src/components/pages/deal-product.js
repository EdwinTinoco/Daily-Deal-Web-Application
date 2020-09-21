import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DealProductDetail from "../products/deal-product-detail"

export default class DealProduct extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dealId: this.props.match.params.slug,
         productDeal: {},
         productDeal2: {
            product_title: "VOZZI TEE",
            product_price: 19.00,
            picture_product: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
            product_description: "Premium cotton fabric. Comfortable and light. Get it while it lasts!",
            stock_left: 50
         }
      }
   }

   getProductDeal() {
      console.log('deal id', this.state.dealId);

      axios.get(`http://localhost:5000/deal/product/${this.state.dealId}`)
         .then(response => {
            console.log('product deal', response.data);

            this.setState({
               productDeal: response.data[0]
            })
         })
         .catch(error => {
            console.log('getProductDeal error', error);
         })
   }

   componentDidMount() {
      this.getProductDeal()
   }

   render() {
      return (
         <div className="deal-product-main-wrapper">
            <div className="content">
               <DealProductDetail productDeal={this.state.productDeal} />

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