import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllActiveDealsList(props) {
   const {
      deal_id,
      deal_user_id,
      user_name,
      user_email,
      deal_created_date,
      deal_status,
      product_title,
      product_price,
      stock_quantity,
      stock_left
   } = props.item

   return (
      <tr key={props.key}>
         <td>
            <Link to={`/ma/business/product-deal/detail/${deal_id}`}>
               {product_title}
            </Link>
         </td>
         <td>
            <Link to={`/ma/deals-business/detail/${deal_user_id}`}>
               {user_name}
            </Link>
         </td>
         <td>{user_email}</td>
         <td>{deal_created_date}</td>
         <td>{stock_quantity}</td>
         <td>{stock_left}</td>
         <td>{`$${product_price}`}</td>
         <td>{deal_status}</td>
         <td>
            <FontAwesomeIcon icon="edit" />
            <FontAwesomeIcon icon="trash" />
         </td>
      </tr>
   )
}