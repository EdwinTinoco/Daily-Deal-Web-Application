import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'
import { devEnv } from "../../helpers/dev-env"

export default class Login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         email: "",
         password: "",
         errorMessage: "",
         showSpinner: "none"
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

      this.setState({
         showSpinner: "block"
      })

      if (this.state.email === "" || this.state.password === "") {
         this.setState({
            errorMessage: "Email or password is wrong",
            showSpinner: "none"
         })
      } else {

         axios.post(`${devEnv}/api/user/login`,
            {
               email: this.state.email,
               password: this.state.password,
               currentDate: moment().format()
            }
         ).then(response => {
            console.log('response login', response.data);

            this.setState({
               showSpinner: "none"
            })

            if (response.data['message'] === "Email or password is wrong") {
               this.setState({
                  errorMessage: "Email or password is wrong"
               })
            } else if (response.data['user'].length > 0) {
               if (response.data['user'][0].role_title !== "user") {
                  Cookies.set("_sb%_user%_session", `%encript%${response.data['user'][0].user_id}`, { expires: 1 })

                  this.props.handleSuccessfulAuth(response.data['user'][0].user_id, response.data['user'][0].role_title);
               } else {
                  this.setState({
                     errorMessage: "Email or password is wrong"
                  })
               }
            } else {
               this.setState({
                  errorMessage: "Email or password is wrong"
               })
            }
         }).catch(error => {
            this.setState({
               errorMessage: "An error ocurred. Try again later",
               showSpinner: "none"
            })

            this.props.handleUnSuccessfulAuth();
         });
      }
   }

   render() {
      return (
         <div className="login-main-wrapper">
            <div className="header">
               <div className="home-link">
                  <Link to='/'>Home</Link>
               </div>

               {/* <div className="have-an-account">
                  <div className="title">
                     <p>Don't have an account?</p>
                  </div>

                  <Link to="/signup/customer">
                     <div className="signup-button">
                        Sign up
                     </div>
                  </Link>
               </div> */}
            </div>


            <div className="login-form-center">
               <div className="login-container">
                  <div className="logo">
                     <Link to="/">
                        <img src={Logo} alt='Logo' />
                     </Link>
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

                     <div className="spinner" style={{ display: this.state.showSpinner }}>
                        <FontAwesomeIcon icon="spinner" spin /><p>Loading</p>
                     </div>
                  </form>

                  <div className="forgot-password">
                     <Link to={{ pathname: "/forgot-password", state: { userRole: "admin" } }}>Forgot your password?</Link>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}