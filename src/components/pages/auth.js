import React, { Component } from 'react';
import Login from "../auth/login";

export default class Auth extends Component {
   constructor(props) {
      super(props);

      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
      this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this)
   }

   handleSuccessfulAuth(user_id, user_role) {
      if (user_role === "master_admin") {
         this.props.handleSuccessfulLogin(user_id, user_role);

         this.props.history.push("/ma/dashboard");

      } else if (user_role === "business_admin") {
         this.props.handleSuccessfulLogin(user_id, user_role);

         this.props.history.push("/ba/dashboard");
      }
   }

   handleUnSuccessfulAuth() {
      this.props.handleUnSuccessfulLogin();
   }

   render() {
      return (
         <div className="auth-page-wrapper">
            <Login
               handleSuccessfulAuth={this.handleSuccessfulAuth}
               handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
            />
         </div>
      );
   }
}