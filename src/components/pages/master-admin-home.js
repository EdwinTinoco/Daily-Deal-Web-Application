import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MasterAdminHome(props) {
   return (
      <div className="master-admin-main-wrapper">
         <div className="search-sales">
            <FontAwesomeIcon icon="search" />

            <input type="text" placeholder="Search" />
         </div>
      </div>
   )
}