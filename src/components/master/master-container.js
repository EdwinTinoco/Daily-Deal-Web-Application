import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation-bar/navigation-bar"


export default function MasterContainer(props) {
   return (
      <div className="master-main-wrapper">
         <NavigationBar />

         <div className="search-sales">
            <FontAwesomeIcon icon="search" />

            <input type="text" placeholder="Search" />
         </div>
      </div>
   )
}