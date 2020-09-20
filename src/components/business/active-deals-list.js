import React, { Component } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ActiveDealsList extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {
         deal_id,
         deal_user_id,
         deal_started_date,
         deal_finished_date,
         deal_status,
         product_title,
         product_price,
         stock_quantity
      } = this.props.item


      return (
         <div className="active-deals-list">
            <div className="deals-info-wrapper">
               <Link to={`/ba/active-deal/detail/${deal_id}`}>
                  <p>{product_title}</p>
               </Link>
               <p>{deal_started_date}</p>
               <p>{deal_finished_date}</p>
               <p>{product_price}</p>
               <p>{stock_quantity}</p>
               <p>{deal_status}</p>
            </div>

            <div className="icons-buttons">
               <FontAwesomeIcon icon="edit" />
               |
               <FontAwesomeIcon icon="trash" />
            </div>
         </div>
      )
   }
}