import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MasterAdminNavbar from "../master-admin/master-admin-navbar"


export default function MasterAdminContainer(props) {
   return (
      <div className="master-admin-main-wrapper">
         <div className="navbar-wrapper">
            <MasterAdminNavbar />
         </div>

         <div className="search-sales">
            <FontAwesomeIcon icon="search" />

            <input type="text" placeholder="Search" />
         </div>
      </div>
   )
}