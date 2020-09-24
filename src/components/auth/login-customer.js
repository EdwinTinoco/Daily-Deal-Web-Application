import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'

export default class LoginCustomer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         user: {},
         email: "",
         password: "",
         errorMessage: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         errorMessage: ""
      });
   }

   handleSubmit(event) {
      event.preventDefault();

      if (this.state.email === "" || this.state.password === "") {
         this.setState({
            errorMessage: "Email or password is wrong"
         })
      } else {

         axios.post("http://localhost:5000/api/user/login",
            {
               email: this.state.email,
               password: this.state.password
            }
         ).then(response => {
            console.log('response login', response.data);

            if (response.data === "Email or password is wrong") {
               this.setState({
                  errorMessage: "Email or password is wrong"
               })
            } else if (response.data.length > 0) {
               this.setState({
                  user: response.data[0]
               })

               Cookies.set("_sb%_user%_session", `%encript%${this.state.user.user_id}`, { expires: 1 })

               this.props.handleSuccessfulAuth();
            } else {
               this.setState({
                  errorMessage: "Email or password is wrong"
               })
            }
         }).catch(error => {
            this.setState({
               errorMessage: "An error ocurred. Try again later"
            })
         });
      }
   }

   render() {
      return (
         <div className="login-main-wrapper">
            <div className="back-to-product-deal">
               <Link to="http://localhost:3000/deal/product/42">Back to the Deal</Link>
            </div>
            <div className="login-form-center">
               <div className="login-container">
                  <div className="logo">
                     <img src={Logo} alt='Logo' />
                  </div>

                  <div className="title">
                     <p>Log in to your account</p>
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
                              type="email"
                              name="email"
                              placeholder="Email address"
                              value={this.state.email}
                              onChange={this.handleChange}
                           />
                        </div>
                     </div>

                     <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>
                        <div className="inputs">
                           <FontAwesomeIcon icon="lock" />
                           <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                           />
                        </div>
                     </div>

                     <button className="btn" type="submit">Log In</button>
                  </form>

                  <div className="forgot-password">
                     <Link to="/signup">Forgot your password?</Link>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}