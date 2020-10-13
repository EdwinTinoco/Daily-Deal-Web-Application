import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'
import { devEnv } from "../../helpers/dev-env"

export default class forgotPassword extends Component {
   constructor(props) {
      super(props)

      this.state = {
         email: "",
         errorMessage: "",
         errorsValidation: {}
      }

      this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit = (event) => {
      event.preventDefault();

      if (this.validate()) {
         axios.post(`${devEnv}/api/user/forgot-password`,
            {
               email: this.state.email
            }
         ).then(response => {
            console.log('forgot password', response.data);

            if (response.data['message'] === "The email sent succesfully") {
               this.setState({
                  errorMessage: "We sent you an email with a link to reset your password",
                  email: "",
                  errorsValidation: {}
               })
            } else {
               this.setState({
                  errorMessage: "Something is wrong with the email, try again",
                  email: "",
                  errorsValidation: {}
               })
            }

         }).catch(error => {
            this.setState({
               errorMessage: "An error ocurred. Try again later"
            })
            console.log('handleSubmit error', error);
         });
      }
   }

   validate = () => {
      let errors = {};
      let isValid = true;

      if (!this.state.email) {
         isValid = false;
         errors["email"] = "Please enter your email";
      }

      if (typeof this.state.email !== "undefined") {
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

         if (!pattern.test(this.state.email)) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
         }
      }

      this.setState({
         errorsValidation: errors
      })

      return isValid;
   }


   render() {
      return (
         <div className="login-main-wrapper">
            <div className="back-to-product-deal">
               {"customer" === "customer" ?
                  (
                     <Link to="/auth/customer">Back to Login</Link>
                  )
                  :
                  (
                     <Link to="/auth">Back to Login</Link>
                  )
               }
            </div>

            <div className="login-form-center">
               <div className="login-container">
                  <div className="logo">
                     <img src={Logo} alt='Logo' />
                  </div>

                  <div className="title">
                     <p>Forgot Password</p>
                  </div>

                  <div className="error-message">
                     {this.state.errorMessage}
                  </div>

                  <form onSubmit={this.handleSubmit} className="login-form">
                     <div className="form-group">
                        <label htmlFor="email"><b>Email address</b></label>
                        <div className="inputs">
                           <FontAwesomeIcon icon="envelope" />
                           <input
                              type="text"
                              name="email"
                              placeholder="Email address"
                              value={this.state.email}
                              onChange={({ target }) => {
                                 this.setState({
                                    email: target.value,
                                    errorMessage: ""
                                 })
                              }}
                           />
                        </div>
                        <div className="error-validation">{this.state.errorsValidation.email}</div>
                     </div>

                     <button className="btn" type="submit">Submit</button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}