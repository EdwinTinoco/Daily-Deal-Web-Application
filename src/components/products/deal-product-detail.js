import React from "react";
import DateCountdown from 'react-date-countdown-timer';

export default function DealProductDetail(props) {
   const {
      deal_finished_date,
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

         <div className="countdown-deal">
            <p>Deal ends in...</p>
            {/* <p>{deal_finished_date}</p> */}
            <DateCountdown dateTo={'2020-09-26 08:30:10'} callback={() => alert('Hello')} />
         </div>

      </div>
   )
}