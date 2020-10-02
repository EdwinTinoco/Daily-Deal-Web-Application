import React, { useState, useContext, useEffect, Component } from "react"
import 'regenerator-runtime/runtime';
import axios from "axios";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

import Image1 from '../../../static/assets/images/pictures/pic-2.jpg'


export default class SignUpCustomer extends Component {
   constructor(props) {
      super(props);

      this.state = {
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

   async handleSubmitRegisterNewUser(e) {
      e.preventDefault();

      if (this.validate()) {
         const response = await fetch("http://localhost:5000/v1/customers", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               role: "user",
               name: "Customer",
               email: this.state.email,
               password: this.state.password,
               active: "Y"
            })
         });

         const customer = await response.json();
         console.log('customer', customer);






         // axios.post('http://localhost:5000/api/user/signup',
         //    {
         //       role: "user",
         //       name: "Customer",
         //       email: this.state.email,
         //       password: this.state.password,
         //       active: "Y"
         //    })
         //    .then(response => {
         //       console.log("new user", response.data)

         //       if (response.data === "A user with that email already exist") {
         //          this.setState({
         //             messageUser: "A user with that email already exist"
         //          })
         //       } else {
         //          this.setState({
         //             email: "",
         //             password: "",
         //             confirmPassword: "",
         //             errorsValidation: {},
         //             messageUser: "The customer user account was created succesfully"
         //          })

         //          Cookies.set("_sb%_user%_session", `%encript%${response.data['@userId']}`, { expires: 1 })

         //          this.props.history.push(`/deal/product/${this.props.location.state.dealId}`);
         //       }
         //    })
         //    .catch(error => {
         //       console.log('handleSubmitRegisterNewUser error', error)
         //    })
      }
   }

   validate() {
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
            <div className="header">
               <div className="home-link">
                  <Link to='/'>Home</Link>
               </div>

               <div className="have-an-account">
                  <div className="title">
                     <p>Don't have an account?</p>
                  </div>

                  <Link to="/auth">
                     <div className="login-button">
                        Login
                     </div>
                  </Link>
               </div>
            </div>

            <div className="skewed-header">
               <div className="header-bg" style={{ backgroundImage: "url('../../../static/assets/images/pictures/pic-2.jpg')" }}></div>
            </div>

            <div className="signup-form-wrapper">
               <div className="right-side">
                  <p>Sign up</p>
                  <p>{this.props.location.state.dealId}</p>

                  <form onSubmit={this.handleSubmitRegisterNewUser} className="signup-form">
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

                     <button type='submit' className='signup-button'>Sign up</button>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}