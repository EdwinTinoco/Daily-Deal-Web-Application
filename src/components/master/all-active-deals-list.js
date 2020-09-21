import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllActiveDealsList(props) {
   const {
      deal_id,
      deal_user_id,
      user_name,
      user_email,
      deal_started_date,
      deal_finished_date,
      deal_status,
      product_title,
      product_price,
      stock_quantity
   } = props.item

   return (
      <tr key={props.key}>
         <td>
            <Link to={`/ba/active-deal/detail/${deal_id}`}>
               {product_title}
            </Link>
         </td>
         <Link to={`/ma/deals-business/detail/${deal_user_id}`}>
            <td>{user_name}</td>
         </Link>
         <td>{user_email}</td>
         <td>{deal_started_date}</td>
         <td>{deal_finished_date}</td>
         <td>{stock_quantity}</td>
         <td>{`$${product_price}`}</td>
         <td>{deal_status}</td>
         <td>
            <FontAwesomeIcon icon="edit" />
            <FontAwesomeIcon icon="trash" />
         </td>
      </tr>
   )
}