import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/daily-deal-logo.png'


export default function MasterAdminNavbar(props) {
   return (
      <div className="master-admin-main-navbar">
         <div className="left-column">
            <img src={Logo} alt='Logo' />
         </div>

         <div className="center-column">
            <div className="links">
               <div className="link">
                  <Link to="/ma-home">Home</Link>
               </div>
            </div>
         </div>

         <div className="right-column">
            <div className="user-info">
               {`Vozzi Company  -  jaredlotic@gmail.com`}
            </div>
         </div>
      </div>
   )
}