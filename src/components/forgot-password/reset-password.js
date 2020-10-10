import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'
import { devEnv } from "../../helpers/dev-env"

export default class ResetPassword extends Component {
   constructor(props) {
      super(props)

      this.state = {
         password: "",
         confirmPassword: "",
         errorMessage: "",
         errorsValidation: {}
      }

      this.handleSubmit = this.handleSubmit.bind(this)
   }

   handleSubmit = (event) => {
      event.preventDefault();

      if (this.validate()) {

         console.log('submit reset password');


         axios.post(`${devEnv}/api/user/reset-password/${this.props.params.match.slug}`,
            {
               token: this.props.params.match.slug,
               newPassword: password
            }
         ).then(response => {
            console.log('response reset password', response.data);


         }).catch(error => {
            setErrorMessage("An error ocurred. Try again later")
            console.log('handleSubmit error', error);
         });
      }
   }


   validate = () => {
      let errors = {};
      let isValid = true;

      if (!this.state.password) {
         isValid = false;
         errors["password"] = "Please enter your password";
      }

      if (!this.state.confirmPassword) {
         isValid = false;
         errors["confirmPassword"] = "Please enter your confirm password";
      }

      if (typeof this.state.password !== "undefined" && typeof this.state.confirmPassword !== "undefined") {

         if (this.state.password != this.state.confirmPassword) {
            isValid = false;
            errors["password"] = "Passwords don't match";
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
            <div className="login-form-center">
               <div className="login-container">
                  <div className="logo">
                     <img src={Logo} alt='Logo' />
                  </div>

                  <div className="title">
                     <p>Reset Password</p>
                  </div>

                  <div className="error-message">
                     {this.state.errorMessage}
                  </div>

                  <form onSubmit={this.handleSubmit} className="login-form">
                     <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>
                        <div className="inputs">
                           <FontAwesomeIcon icon="lock" />
                           <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={({ target }) => {
                                 this.setState({
                                    password: target.value,
                                    errorMessage: ""
                                 })
                              }}
                           />
                        </div>
                        <div className="error-validation">{this.state.errorsValidation.password}</div>
                     </div>

                     <div className="form-group">
                        <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                        <div className="inputs">
                           <FontAwesomeIcon icon="lock" />
                           <input
                              type="password"
                              name="confirm_password"
                              placeholder="Confirm Password"
                              value={this.state.confirmPassword}
                              onChange={({ target }) => {
                                 this.setState({
                                    confirmPassword: target.value,
                                    errorMessage: ""
                                 })
                              }}
                           />
                        </div>
                        <div className="error-validation">{this.state.errorsValidation.confirmPassword}</div>
                     </div>

                     <button className="btn" type="submit">Submit</button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}