import React, { useState, } from "react"
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { devEnv } from "../../helpers/dev-env"

export default function SignUpAdmin(props) {
   const history = useHistory();

   const [showSpinner, setShowSpinner] = useState("none")
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [adminCode, setAdminCode] = useState("")
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
               role: "master_admin",
               name: name,
               email: email.toLowerCase(),
               code: adminCode,
               password: password,
               active: "Y"
            })
         });

         const masterAdmin = await response.json();
         console.log('masterAdmin', masterAdmin);

         if (masterAdmin['message'] === "A user with that email already exist") {
            setMessage("A user with that email already exist")
            setShowSpinner("none")

         } else if (masterAdmin['message'] === "Customer created succesfully") {
            setName("")
            setEmail("")
            setPassword("")
            setAdminCode("")
            setConfirmPassword("")
            setErrorsValidation({})
            setMessage("The master admin account was created succesfully. Now you can login!")
            setShowSpinner("none")

            // Cookies.set("_sb%_user%_session", `%encript%${masterAdmin['result']['@userId']}`, { expires: 1 })

            // history.push("/ma/dashboard");
         } else if (masterAdmin['message'] === "The admin code is wrong") {
            setMessage("The admin code is wrong")
            setShowSpinner("none")
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

      if (!adminCode) {
         isValid = false;
         errors["adminCode"] = "Please enter your admin code";
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

               <Link to="/auth">
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
                  <label htmlFor="admin-code"><b>Code</b></label>
                  <input type='password'
                     className='new-entry-input'
                     name="admin-code"
                     placeholder='Code'
                     value={adminCode}
                     onChange={({ target }) => { setAdminCode(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.adminCode}</div>
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

                  <div className="text-btn">
                     <p>Sign up</p>
                  </div>
               </button>               
            </form>
         </div>
      </div>
   )
}