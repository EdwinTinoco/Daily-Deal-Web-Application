import React from "react";

export default function DealSalesDetails(props) {
   const {
      user_name,
      user_email,
      sales_date,
      sales_subtotal,
      sales_taxes,
      sales_total,
      shipping_type_title,
      shipping_name,
      shipping_line_1,
      shipping_line_2,
      shipping_city,
      shipping_state,
      shipping_zip_code,
      shipping_country
   } = props.item

   return (
      <tr key={props.key}>
         <td>{user_name}</td>
         <td>{user_email}</td>
         <td>{sales_date}</td>
         <td>{`$${sales_subtotal}`}</td>
         <td>{`$${sales_taxes}`}</td>
         <td>{`$${sales_total}`}</td>
         <td>{shipping_type_title}</td>
         <td>{shipping_name}</td>
         <td>{shipping_line_1}</td>
         <td>{shipping_line_2}</td>
         <td>{shipping_city}</td>
         <td>{shipping_state}</td>
         <td>{shipping_zip_code}</td>
         <td>{shipping_country}</td>
      </tr>
   )
}