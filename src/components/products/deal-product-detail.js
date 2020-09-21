import React from "react";
import axios from "axios";

export default function DealProductDetail(props) {
   const {
      picture_product,
      product_title,
      product_description,
      product_price,
      stock_left
   } = props.productDeal

   return (
      <div className="deal-product-detail-main-wrapper">
         <div className="image">
            <img src={picture_product} alt="image" />
         </div>

         <div className="title-description">
            <p className="title">{product_title}</p>
            <p className="description">{product_description}</p>
         </div>

         <div className="price-stock">
            <p className="price">${product_price}</p>

            <div className="stock">
               <p className="number">{stock_left}</p>

               <p className="left">LEFT</p>
            </div>
         </div>

      </div>
   )
}