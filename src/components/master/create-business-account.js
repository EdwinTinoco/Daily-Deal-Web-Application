import React, { useState, useRef } from "react"
import DropzoneComponent from "react-dropzone-component";

import NavigationBar from '../navigation-bar/navigation-bar'

export default function CreateBusinessAccount(props) {
   const [name, setName] = useState("")
   const [line1, setLine1] = useState("")
   const [line2, setLine2] = useState("")
   const [city, setCity] = useState("")
   const [zp, setZp] = useState("")
   const [state, setState] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [errorsValidation, setErrorsValidation] = useState({})
   const [message, setMessage] = useState("")
   const [logo, setLogo] = useState("")
   const logoRef = useRef()

   const componentConfig = () => {
      return {
         iconFiletypes: [".jpg", ".png"],
         showFiletypeIcon: true,
         postUrl: "https://httpbin.org/post"
      }
   }

   const djsConfig = () => {
      return {
         addRemoveLinks: true,
         maxFiles: 1
      }
   }

   const handleThumbDrop1 = () => {
      return {
         addedfile: file => setLogo(file)
      };
   }

   const handleSubmitRegisterNewUser = async (e) => {
      e.preventDefault();

      if (validate()) {
         const response = await fetch("http://localhost:5000/v1/customers", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               role: "business_admin",
               name: name,
               line1: line1,
               line2: line2,
               city: city,
               zp: zp,
               state: state,
               email: email,
               password: password,
               logo: logo.dataURL,
               active: "Y"
            })
         });

         const customer = await response.json();
         console.log('customer', customer);

         if (customer['message'] === "A user with that email already exist") {
            setMessage("A user with that email already exist")

         } else if (customer['message'] === "Customer created succesfully") {
            setName("")
            setLine1("")
            setLine2("")
            setCity("")
            setZp("")
            setState("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setLogo('')
            setErrorsValidation({})
            setMessage("Business user account was created sucesfully")

            logoRef.current.dropzone.removeAllFiles()
         } else {
            console.log('handleSubmitRegisterNewUser error', customer)
         }





         // await axios.post('http://localhost:5000/v1/customers',
         //    {
         //       role: "business_admin",
         //       name: name,
         //       line1: line1,
         //       line2: line2,
         //       city: city,
         //       zp: zp,
         //       state: state,
         //       email: email,
         //       password: password,
         //       active: "Y"
         //    }
         // )
         //    .then(response => {
         //       if (response.data === "A user with that email already exist") {
         //          setMessageUser(response.data)

         //       } else {
         //          setName("")
         //          setLine1("")
         //          setLine2("")
         //          setCity("")
         //          setZp("")
         //          setState("")
         //          setEmail("")
         //          setPassword("")
         //          setConfirmPassword("")
         //          setErrorsValidation({})
         //          setMessageUser("Business user account was created sucesfully")
         //       }

         //    })
         //    .catch(error => {
         //       console.log('handleSubmitRegisterNewUser error', error)
         //    })
      }
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!name) {
         isValid = false;
         errors["name"] = "Please enter a name";
      }

      if (!line1) {
         isValid = false;
         errors["line1"] = "Please enter a address";
      }

      if (!city) {
         isValid = false;
         errors["city"] = "Please enter a city";
      }

      if (!zp) {
         isValid = false;
         errors["zp"] = "Please enter a zip code";
      }

      if (!state) {
         isValid = false;
         errors["state"] = "Please enter a state";
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

      if (!logo) {
         isValid = false;
         errors["logo"] = "Please select a logo";
      }

      setErrorsValidation(errors)

      return isValid;
   }


   return (
      <div className="signup-main-wrapper" >
         <NavigationBar />

         <div className="signup-form-wrapper">
            <p>Create Business Account</p>

            <form onSubmit={handleSubmitRegisterNewUser} className="signup-form">
               <div className="form-group">
                  <label htmlFor="name"><b>Company / Name</b></label>
                  <input type='text'
                     className='new-entry-input'
                     name="name"
                     placeholder='Company / Name'
                     value={name}
                     onChange={({ target }) => { setName(target.value) }}
                  />
                  <div className="error-validation">{errorsValidation.name}</div>
               </div>

               <div className="address">
                  <div className="form-group">
                     <label htmlFor="line1"><b>Address</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={line1}
                        onChange={({ target }) => { setLine1(target.value) }}
                        name="line1"
                        placeholder='Address'
                     />
                     <div className="error-validation">{errorsValidation.line1}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="line2"><b>Apt, unit</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={line2}
                        onChange={({ target }) => { setLine2(target.value) }}
                        name="line2"
                        placeholder='Apartment, unit, etc'
                     />
                     <div className="error-validation">{errorsValidation.line2}</div>
                  </div>
               </div>

               <div className="city-zp">
                  <div className="form-group">
                     <label htmlFor="city"><b>City</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={city}
                        onChange={({ target }) => { setCity(target.value) }}
                        name="city"
                        placeholder='City'
                     />
                     <div className="error-validation">{errorsValidation.city}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="zp"><b>Zip code</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={zp}
                        onChange={({ target }) => { setZp(target.value) }}
                        name="zp"
                        placeholder='Zip code'
                     />
                     <div className="error-validation">{errorsValidation.zp}</div>
                  </div>
               </div>

               <div className="state-country">
                  <div className="form-group">
                     <label htmlFor="state"><b>State</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={state}
                        onChange={({ target }) => { setState(target.value) }}
                        name="state"
                        placeholder='State'
                     />
                     <div className="error-validation">{errorsValidation.state}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="country"><b>Country</b></label>
                     <input type='text'
                        className='new-entry-input'
                        defaultValue="US"
                        name="country"
                        placeholder='Country'
                     />
                  </div>
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

               <div className="form-group">
                  <label htmlFor="logo"><b>Select a logo</b></label>
                  <DropzoneComponent
                     name="logo"
                     ref={logoRef}
                     config={componentConfig()}
                     djsConfig={djsConfig()}
                     eventHandlers={handleThumbDrop1()}
                  >
                     <div className="dz-message">Drop the image here to upload</div>
                  </DropzoneComponent>
                  <div className="error-validation">{errorsValidation.logo}</div>
               </div>

               <div className="message">
                  <p>{message}</p>
               </div>

               <button type='submit' className='add-button'>Create Account</button>
            </form>
         </div>
      </div>
   )

}