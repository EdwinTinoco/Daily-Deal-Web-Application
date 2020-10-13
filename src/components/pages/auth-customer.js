import React, { Component } from 'react';

import LoginCustomer from "../auth/login-customer";

export default class AuthCustomer extends Component {
   constructor(props) {
      super(props);

      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
   }

   handleSuccessfulAuth() {
      this.props.history.push(`/deal/product/${this.props.location.state.dealId}`);
   }

   render() {
      return (
         <div className="auth-page-wrapper">
            <LoginCustomer dealId={this.props.location.state.dealId} handleSuccessfulAuth={this.handleSuccessfulAuth} />
         </div>
      );
   }
}

