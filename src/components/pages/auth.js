import React, { Component } from 'react';
import Login from "../auth/login";

import loginImg from '../../../static/assets/images/logo/logo-1.png'

export default class Auth extends Component {
   constructor(props) {
      super(props);

      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
   }

   handleSuccessfulAuth() {
      this.props.history.push("/");
   }

   render() {
      return (
         <div className="auth-page-wrapper">
            <div
               className="left-column"
               style={{
                  backgroundImage: `url(${loginImg})`
               }}
            />

            <div className="right-column">
               <Login
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
               />
            </div>
         </div>
      );
   }
}