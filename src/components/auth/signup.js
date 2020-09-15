import React, { useState, useContext, useEffect, Component } from "react"
import axios from "axios";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

import Image1 from '../../../static/assets/images/pictures/pic-1.jpg'


export default class SignUp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         idLastUser: 0,
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
         // axios
         //    .post(
         //       'http://localhost:8000/api/users/signup/',
         //       {
         //          email: this.state.email,
         //          password: this.state.password
         //       },
         //    )
         //    .then(response => {
         //       console.log("new user", response.data)

         //       this.setState({
         //          email: "",
         //          password: "",
         //          messageUser: "User Added Succesfully!"
         //       })

         //       axios.get('http://localhost:8000/api/users/id/')
         //          .then(response => {
         //             console.log("id last user", response.data[0][0])

         //             this.setState({
         //                idLastUser: response.data[0][0]
         //             })

         //             Cookies.set("_sb%_user%_session", `%encript%${response.data[0][0]}`, { expires: 2 })
         //          })
         //          .catch(error => {
         //             console.log('handleSubmitRegisterNewUser error', error)
         //          })

         //       // this.props.history.push("/");
         //       // window.location.reload(false);
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
            <div className="have-an-account">
               <div className="title">
                  <p>Already have an account?</p>
               </div>

               <Link to="/auth">
                  <div className="login-button">
                     Login
                  </div>
               </Link>
            </div>

            <div className="signup-form-wrapper">
               <div className="left-side">
                  <div className="image">
                     <img src={Image1} alt='image' />
                  </div>
               </div>
               <div className="right-side">
                  <p>Sign up</p>

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

                     <button type='submit' className='add-button'>Sign up</button>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}