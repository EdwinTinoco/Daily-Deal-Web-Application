import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function PreviewDealProduct(props) {
   const [tempImage, setTempImage] = useState("https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9")
   return (
      <div className="preview-deal">
         <div className="image">
            <img src={props.image || tempImage} alt="image" />
         </div>

         <div className="title-description">
            <p className="title">{props.title.toUpperCase() || "PRODUCT TITLE"}</p>
            <p className="description">{props.description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit."}</p>
         </div>

         <div className="price-stock">
            <p className="price">${props.price || 19.99}</p>

            <div className="stock">
               <p className="number">{props.stock || "0"}</p>

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