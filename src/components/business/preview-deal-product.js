import React from "react"

export default function PreviewDealProduct(props) {
   return (
      <div className="preview-deal">
         <div className="image">
            <img src={props.image} alt="image" />
         </div>

         <div className="title-description">
            <p className="title">{props.title}</p>
            <p className="description">{props.description}</p>
         </div>

         <div className="price-stock">
            <p className="price">${props.price}</p>

            <div className="stock">
               <p className="number">{props.stock}</p>

               <p className="left">LEFT</p>
            </div>
         </div>
      </div>
   )
}