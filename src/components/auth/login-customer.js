import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'

export default function LoginCustomer(props) {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [errorMessage, setErrorMessage] = useState("")
   const [errorsValidation, setErrorsValidation] = useState({})

   const handleSubmit = (event) => {
      event.preventDefault();

      if (validate()) {

         axios.post("http://localhost:5000/api/user/login",
            {
               email: email,
               password: password
            }
         ).then(response => {
            console.log('response login customer', response.data);

            if (response.data === "Email or password is wrong") {
               setErrorMessage("Email or password is wrong")

            } else if (response.data.length > 0) {
               Cookies.set("_sb%_user%_session", `%encript%${response.data[0].user_id}`, { expires: 1 })

               props.handleSuccessfulAuth();
            } else {
               setErrorMessage("Email or password is wrong")
            }
         }).catch(error => {
            setErrorMessage("An error ocurred. Try again later")
         });
      }
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!email) {
         isValid = false;
         errors["email"] = "Please enter your email";
      }

      if (typeof email !== "undefined") {
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

         if (!pattern.test(email)) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
         }
      }

      if (!password) {
         isValid = false;
         errors["password"] = "Please enter your password";
      }

      setErrorsValidation(errors)

      return isValid;
   }

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
                  {errorMessage}
               </div>

               <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                     <label htmlFor="email"><b>Email address</b></label>
                     <div className="inputs">
                        <FontAwesomeIcon icon="envelope" />
                        <input
                           type="text"
                           name="email"
                           placeholder="Email address"
                           value={email}
                           onChange={({ target }) => {
                              setEmail(target.value)
                              setErrorMessage('')
                           }}
                        />
                     </div>
                     <div className="error-validation">{errorsValidation.email}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="password"><b>Password</b></label>
                     <div className="inputs">
                        <FontAwesomeIcon icon="lock" />
                        <input
                           type="password"
                           name="password"
                           placeholder="Password"
                           value={password}
                           onChange={({ target }) => {
                              setPassword(target.value)
                              setErrorMessage('')
                           }}
                        />
                     </div>
                     <div className="error-validation">{errorsValidation.password}</div>
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