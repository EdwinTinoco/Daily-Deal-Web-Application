import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function PreviewDealProduct(props) {
   const [tempImage, setTempImage] = useState("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9")

   const thumbImage1 = props.thumbImage1
   const title = props.title
   const description = props.description
   const price = props.price
   const stock = props.stock


   return (
      <div className="preview-deal">
         <div className="image">
            <img src={thumbImage1} alt="image" />
         </div>

         <div className="title-description">
            <p className="title">{title.toUpperCase()}</p>
            <p className="description">{description}</p>
         </div>

         <div className="price-stock">
            <p className="price">${price}</p>

            <div className="stock">
               <p className="number">{stock}</p>

               <p className="left">LEFT</p>
            </div>
         </div>

         <div className="buy-button">
            <button type="button">BUY</button>
         </div>

         <div className="links-wrapper">
            <div className="link">
               <Link to="/ba/new-deal">SIGN IN</Link>
            </div>

            <div className="link">
               <Link to="/ba/new-deal">SIGN UP</Link>
            </div>
         </div>
      </div>
   )
}