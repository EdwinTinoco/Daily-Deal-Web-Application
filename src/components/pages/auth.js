import React, { Component } from 'react';
import Login from "../auth/login";

export default class Auth extends Component {
   constructor() {
      super();

      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
   }

   handleSuccessfulAuth(user_role) {
      if (user_role === "master_admin") {
         this.props.history.push("/ma/dashboard");
      } else if (user_role === "business_admin") {
         this.props.history.push("/ba/dashboard");
      }
   }

   render() {
      return (
         <div className="auth-page-wrapper">
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
         </div>
      );
   }
}