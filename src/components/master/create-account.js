import React, { useState, useContext, useEffect, Component } from "react"
import axios from "axios";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

import NavigationBar from '../navigation-bar/navigation-bar'

export default class CreateAccount extends Component {
   constructor(props) {
      super(props);

      this.state = {
         idLastUser: 0,
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
         errorsValidation: {},
         messageUser: ""
      }

      this.handleSubmitRegisterNewUser = this.handleSubmitRegisterNewUser.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value,
         messageUser: ""
      });
   }

   handleSubmitRegisterNewUser(e) {
      e.preventDefault();

      if (this.validate()) {
         axios
            .post(
               'http://localhost:5000/api/user/signup',
               {
                  role: "business_admin",
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password,
                  active: "Y"
               },
            )
            .then(response => {
               this.setState({
                  email: "",
                  password: "",
                  messageUser: response.data
               })
            })
            .catch(error => {
               console.log('handleSubmitRegisterNewUser error', error)
            })
      }
   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.name) {
         isValid = false;
         errors["name"] = "Please enter a name";
      }

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
         <div className="signup-main-wrapper" >
            <NavigationBar />

            <div className="signup-form-wrapper">
               <p>Create Business Account</p>

               <form onSubmit={this.handleSubmitRegisterNewUser} className="signup-form">
                  <div className="form-group">
                     <label htmlFor="name"><b>Company / Name</b></label>
                     <input type='text'
                        className='new-entry-input'
                        name="name"
                        placeholder='Company / Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                     />
                     <div className="error-validation">{this.state.errorsValidation.name}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="email"><b>Email address</b></label>
                     <input type='text'
                        className='new-entry-input'
                        name="email"
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                     />
                     <div className="error-validation">{this.state.errorsValidation.email}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="password"><b>Password</b></label>
                     <input type='password'
                        className='new-entry-input'
                        name="password"
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                     />
                     <div className="error-validation">{this.state.errorsValidation.password}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="confirm-password"><b>Confirm Password</b></label>
                     <input type='password'
                        className='new-entry-input'
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                     />
                     <div className="error-validation">{this.state.errorsValidation.confirmPassword}</div>
                  </div>

                  <div className="message">
                     <p>{this.state.messageUser}</p>
                  </div>

                  <button type='submit' className='add-button'>Create Account</button>
               </form>
            </div>
         </div>
      )
   }
}