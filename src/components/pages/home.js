import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationBar from '../navigation-bar/navigation-bar'
import Footer from '../footer/footer'
import { devEnv } from "../../helpers/dev-env"

export default function Home() {
   return (
      <div className="home-main-wrapper">
         <NavigationBar />

         <div className="title-info-img">
            <div className="title">
               <p>Kudu Web Application</p>
               <p>{devEnv}</p>
            </div>

            <div className="info">
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a felis
                  non sem elementum tempor in at urna. Suspendisse auctor libero ut nibh
                  consequat sed sagittis dolor iaculis. Donec condimentum mauris nec eros
                  auctor sed vestibulum tellus consequat.
                  </p>
            </div>

            <Link to="/auth">
               <div className="button">
                  <p>Log In</p>
               </div>
            </Link>
         </div>

         <div className="featured-section">
            <div className="columns-wrapper">
               <div className="column">
                  <FontAwesomeIcon className="icon" icon="globe-americas" />
                  <p className="title">Best Products</p>

                  <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
               </div>

               <div className="column">
                  <FontAwesomeIcon className="icon" icon="globe-americas" />
                  <p className="title">Daily Deals</p>

                  <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
               </div>

               <div className="column">
                  <FontAwesomeIcon className="icon" icon="globe-americas" />
                  <p className="title">Quality</p>

                  <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
               </div>
            </div>

         </div>

         <div className="subscribe-link">
            <Link to="/">
               <div className="button">
                  Subscribe
               </div>
            </Link>
         </div>

         <Footer />
      </div>
   )
}