import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/kudu-LogoLightBG.png'
import { devEnv } from "../../helpers/dev-env"

export default function forgotPassword(props) {
   const [showSpinner, setShowSpinner] = useState("none")
   const [email, setEmail] = useState("")
   const [errorsValidation, setErrorsValidation] = useState({})
   const [message, setMessage] = useState("")

   const handleSubmit = async (event) => {
      event.preventDefault();
      setShowSpinner("block")

      if (validate()) {
         await axios.post(`${devEnv}/api/user/forgot-password`,
            {
               email: email
            }
         ).then(response => {
            console.log('forgot password', response.data);

            if (response.data['message'] === "The email sent succesfully") {
               setMessage("We sent you an email with a link to reset your password")
               setEmail("")
               setErrorsValidation({})
            } else {
               setMessage("Something is wrong with the email, try again")
               setEmail("")
               setErrorsValidation({})
            }

            setShowSpinner("none")

         }).catch(error => {
            setMessage("An error ocurred. Try again later")
            setShowSpinner("none")
            console.log('handleSubmit error', error);
         });
      } else {
         setShowSpinner("none")
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

      setErrorsValidation(errors)

      return isValid;
   }

   return (
      <div className="login-main-wrapper">
         <div className="back-to-product-deal">
            {props.location.state.userRole === "admin" ?
               (
                  <Link to="/auth">Back to Login</Link>
               )
               :
               (
                  <Link to={{ pathname: "/auth/customer", state: { dealId: props.location.state.dealId } }}>Back to Login</Link>
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
                  {message}
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
                              setMessage("")
                           }}
                        />
                     </div>
                     <div className="error-validation">{errorsValidation.email}</div>
                  </div>

                  <button className="btn" type="submit">
                     <div className="spinner" style={{ display: showSpinner }}>
                        <FontAwesomeIcon icon="spinner" spin />
                     </div>

                     <div className="text-btn">
                        <p>Log In</p>
                     </div>
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}