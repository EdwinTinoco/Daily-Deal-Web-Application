import React, { useState, } from "react"
import Cookies from 'js-cookie'
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { devEnv } from "../../helpers/dev-env"

export default function SignUpCustomer(props) {
   const history = useHistory();

   const [showSpinner, setShowSpinner] = useState("none")
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [errorsValidation, setErrorsValidation] = useState({})
   const [message, setMessage] = useState("")

   const handleSubmitRegisterNewUser = async (e) => {
      e.preventDefault();
      setShowSpinner("block")

      if (validate()) {
         const response = await fetch(`${devEnv}/v1/customers`, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               role: "user",
               name: name,
               email: email.toLowerCase(),
               password: password,
               active: "Y"
            })
         });

         const customer = await response.json();
         console.log('customer', customer);

         if (customer['message'] === "A user with that email already exist") {
            setMessage("A user with that email already exist")
            setShowSpinner("none")

         } else if (customer['message'] === "Customer created succesfully") {
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setErrorsValidation({})
            setMessage("The customer user account was created succesfully")
            setShowSpinner("none")

            Cookies.set("_sb%_user%_session", `%encript%${customer['result']['@userId']}`, { expires: 1 })

            history.push(`/deal/product/${props.location.state.dealId}`);
         } else {
            console.log('handleSubmitRegisterNewUser error', customer)
         }
      } else {
         setShowSpinner("none")
      }
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!name) {
         isValid = false;
         errors["name"] = "Please enter your name";
      }

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

      if (!confirmPassword) {
         isValid = false;
         errors["confirmPassword"] = "Please enter your confirm password";
      }

      if (typeof password !== "undefined" && typeof confirmPassword !== "undefined") {

         if (password != confirmPassword) {
            isValid = false;
            errors["password"] = "Passwords don't match";
         }
      }

      setErrorsValidation(errors)

      return isValid;
   }


   return (
      <div className="signup-main-wrapper" >
         <div className="header">
            <div className="have-an-account">
               <div className="title">
                  <p>Already have an account?</p>
               </div>

               <Link to={{ pathname: `/auth/customer`, state: { dealId: props.location.state.dealId } }}>
                  <div className="login-button">
                     Login
                     </div>
               </Link>
            </div>
         </div>

         <div className="signup-form-wrapper">
            <form onSubmit={handleSubmitRegisterNewUser} className="signup-form">
               <p>Sign up</p>

               <div className="form-group">
                  <label htmlFor="name"><b>Name</b></label>
                  <input type='text'
                     className='new-entry-input'
                     name="name"
                     placeholder='Name'
                     value={name}
                     onChange={({ target }) => { setName(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.name}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="email"><b>Email address</b></label>
                  <input type='text'
                     className='new-entry-input'
                     name="email"
                     placeholder='Email'
                     value={email}
                     onChange={({ target }) => { setEmail(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.email}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="password"><b>Password</b></label>
                  <input type='password'
                     className='new-entry-input'
                     name="password"
                     placeholder='Password'
                     value={password}
                     onChange={({ target }) => { setPassword(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.password}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="confirm-password"><b>Confirm Password</b></label>
                  <input type='password'
                     className='new-entry-input'
                     name="confirmPassword"
                     placeholder='Confirm Password'
                     value={confirmPassword}
                     onChange={({ target }) => { setConfirmPassword(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.confirmPassword}</div>
               </div>

               <div className="message">
                  <p>{message}</p>
               </div>

               <button type='submit' className='signup-button'>
                  <div className="spinner" style={{ display: showSpinner }}>
                     <FontAwesomeIcon icon="spinner" spin />
                  </div>

                  <p>Sign up</p>
               </button> 
            </form>
         </div>
      </div>
   )
}