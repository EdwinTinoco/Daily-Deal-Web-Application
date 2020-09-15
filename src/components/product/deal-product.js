import React from "react"

export default function DealProduct(props) {
   const {
      title,
      image,
      price,
      description,
      stock
   } = props.dealProduct

   return (
      <div className="deal-product">
         <div className="image">
            <img src={image} alt="image" />
         </div>

         <div className="title-description">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
         </div>

         <div className="price-stock">
            <p className="price">${price.toFixed(2)}</p>

            <div className="stock">
               <p className="number">{stock}</p>

               <p className="left">LEFT</p>
            </div>
         </div>

      </div>
   )
}