import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllActiveDealsList(props) {
   const {  
      deal_id,
      deal_user_id,
      user_name,
      deal_started_date,
      deal_finished_date,
      deal_status,
      product_title,
      product_price,
      stock_quantity,
      stock_left,
      sales,
      total_sales
   } = props.item

   return (
      <tr>
         <td>
            <Link to={`/ba/active-deal/detail/${deal_id}`}>
               {product_title}
            </Link>
         </td>
         <td>
            <Link to={`/ma/deals-business/detail/${deal_user_id}`}>
               {user_name}
            </Link>
         </td>
         <td>{moment.utc(deal_started_date).local().format("MMMM Do YYYY, hh:mm:ss a")}</td>
         <td>{moment.utc(deal_finished_date).local().format("MMMM Do YYYY, hh:mm:ss a")}</td>
         <td>{stock_quantity}</td>
         <td>{stock_left}</td>
         <td>{`$${parseFloat(product_price).toFixed(2)}`}</td>
         <td>{sales}</td>
         <td>{`$${parseFloat(total_sales).toFixed(2)}`}</td>
         <td>{deal_status}</td>
         {/* <td>
            <FontAwesomeIcon icon="edit" />
            <FontAwesomeIcon icon="trash" />
         </td> */}
      </tr>
   )
}