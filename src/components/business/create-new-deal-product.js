import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies, { set } from 'js-cookie';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import DropzoneComponent from "react-dropzone-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import NavigationBar from "../navigation-bar/navigation-bar"
import PreviewDealProduct from "./preview-deal-product"
import { devEnv } from "../../helpers/dev-env"

export default function CreateNewDealProduct(props) {
   const [showSpinner, setShowSpinner] = useState("none")
   const [user, setUser] = useState({})
   const [dealProductId, setDealProductId] = useState(0)
   const [urlGenerated, setUrlGenerated] = useState("")
   const [thumbImage1, setThumbImage1] = useState("")
   const [thumbImage2, setThumbImage2] = useState("")
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState("")
   const [comparePrice, setComparePrice] = useState("")
   const [stock, setStock] = useState("")
   const [squ, setSqu] = useState("")
   const [shippingTypeId, setShippingTypeId] = useState("")
   const [startedDealDate, setStartedDealDate] = useState("")
   const [finishedDealDate, setFinishedDealDate] = useState("")
   const [previewShow, setPreviewShow] = useState("none")
   const [shippingTypesCatalog, setShippingTypesCatalog] = useState([])
   const [errorsValidation, setErrorsValidation] = useState({})
   const thumbImage1Ref = useRef()
   const thumbImage2Ref = useRef()

   //const [pickupStoreCatalog, setPickupStoreCatalog] = useState([])
   //const [pickupStore, setPickupStore] = useState("")
   const [storeName, setStoreName] = useState("")
   const [line1, setLine1] = useState("")
   const [line2, setLine2] = useState("")
   const [city, setCity] = useState("")
   const [zp, setZp] = useState("")
   const [state, setState] = useState("")
   const [showPickupStoreElements, setShowAddPickupStoreElements] = useState("none")
   const [showAddPickupStoreAddress, setShowAddPickupStoreAddress] = useState("none")
   const [checkBoxChecked, setCheckBoxChecked] = useState(false)
   const [pickupStoreAddress, setPickupStoreAddress] = useState({})


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
         addedfile: file => setThumbImage1(file)
      };
   }

   const handleThumbDrop2 = () => {
      return {
         addedfile: file => setThumbImage2(file)
      };
   }

   const handleLogout = () => {
      setUser({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const handleClearInputs = () => {
      setTitle("")
      setThumbImage1("")
      setDescription("")
      setPrice("")
      setComparePrice("")
      setStock("")
      setSqu("")
      setShippingTypeId("")
      setPreviewShow("none")
      setErrorsValidation({})
      setStoreName("")
      setLine1("")
      setLine2("")
      setCity("")
      setZp("")
      setState("")
      setShowAddPickupStoreElements("none")
      setShowAddPickupStoreAddress("none")
      setCheckBoxChecked(false)
   }

   const handlePreviewDealProduct = () => {
      console.log('thumbImage1', thumbImage1);

      if (validate()) {
         setPreviewShow("block")
      }
   }

   const handlePickupStore = (value) => {
      if (value === "2"){
         setShowAddPickupStoreElements("block"),
         setShowAddPickupStoreAddress("none"),
         setCheckBoxChecked(false)

      }else{
         setShowAddPickupStoreElements("none"),
         setShowAddPickupStoreAddress("none"),
         setCheckBoxChecked(false)
      }
   }
                              

   const handleChangeCheckbox = () => {
      if (!checkBoxChecked) {
         //setPickupStore("")
         setShowAddPickupStoreAddress('block')
         setCheckBoxChecked(true)

      } else {
         setShowAddPickupStoreAddress('none')
         setCheckBoxChecked(false)
      }
   }

   const handleSubmitNewDeal = async (e) => {
      e.preventDefault()
      setShowSpinner("block")

      if (validate()) {
         let createDateDB = moment().format();
         let startDateDB = createDateDB;
         let finishDateDB = moment().add(1, 'days').format();

         const response = await fetch(`${devEnv}/v1/products`, {
               method: "POST",
               headers: {
                  'Content-Type': 'application/json'                  
               },
               body: JSON.stringify({
                  userId: user.user_id,
                  title: title,
                  thumbImage1: thumbImage1.dataURL,
                  description: description,
                  price: parseFloat(price).toFixed(2),
                  comparePrice: parseFloat(comparePrice).toFixed(2),
                  squ: squ,
                  stock: parseInt(stock),
                  shippingTypeId: shippingTypeId,
                  createdDealDate: createDateDB,
                  startedDealDate: startDateDB,
                  finishedDealDate: finishDateDB,
                  dealStatus: "active"
               })
            });

            const product = await response.json();

            if (product['message'] === "Product created succesfully"){
               setDealProductId(product['result']["@dealId"])
               setUrlGenerated(product['result']["@generatedDealProductUrl"])

               handleClearInputs()

               setStartedDealDate(moment(startDateDB).format("MMMM Do YYYY, hh:mm:ss a"))
               setFinishedDealDate(moment(finishDateDB).format("MMMM Do YYYY, hh:mm:ss a"))

               thumbImage1Ref.current.dropzone.removeAllFiles()

               // [thumbImage1Ref].forEach(ref => {
               //    ref.current.dropzone.removeAllFiles()
               // }); 

               if (shippingTypeId === "11"){
                  if (checkBoxChecked){

                     console.log('si entro');
                     
                     await axios.post(`${devEnv}/api/user/update/pickup-store`, 
                     {
                        userId: user.user_id,
                        storeName: storeName,
                        line1: line1,
                        line2: line2,
                        city: city,
                        zp: zp,
                        state: state
                     })
                     .then(response => {
                        console.log('update pick up store', response.data);
                        
                     })
                     .catch(error =>{
                        console.log('handleSubmitNewDeal update pickup store', error);                  
                     })
                  }
               }

               setShowSpinner("none")
            } else{
               console.log('handleSubmitNewDeal error', product)
            }         
      } else {
         setShowSpinner("none")
      }
   }

   const getCurrentUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
         for (var i = 0; i < userCookie.length; i++) {
            if (userCookie[i] == "%") {
               temp += 1
            }

            if (temp === 2) {
               if (userCookie[i] !== "%") {
                  userIdArr.push(userCookie[i])
               }
            }
         }

         let userId = userIdArr.join('')

         axios.get(`${devEnv}/api/user/${userId}`)
            .then(response => {
               console.log('current user', response.data);

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }
            }).catch(error => {
               console.log('getCurrentUser error', error);
            });
      }
   }

   const getShippingTypes = () => {
      axios.get(`${devEnv}/api/shipping-types`)
         .then(response => {
            console.log('shipping types', response.data);

            setShippingTypesCatalog(response.data)
         })
         .catch(error => {
            console.log('getShippingTypes error', error);
         })
   }

   const getPickupAddress = () => {
      axios.get(`${devEnv}/api/user/pickup-store/${user.user_id}`)
         .then(response => {
            console.log('pick up store', response.data);
            if (response.data.length > 0){
               setPickupStoreAddress(response.data[0])
            }

         })
         .catch(error => {
            console.log('getPickupAddress error', error);
         })
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!title) {
         isValid = false;
         errors["title"] = "Please enter a title";
      }

      if (!thumbImage1) {
         isValid = false;
         errors["thumbImage1"] = "Please select an image";
      }

      if (!description) {
         isValid = false;
         errors["description"] = "Please enter a description";
      }

      if (!price) {
         isValid = false;
         errors["price"] = "Please enter a price";
      }
      
      if (typeof price !== "undefined") {         
         var pattern = new RegExp(/^(\d+|\d+.\d{2})$/);
   
         if (!pattern.test(price)) {
            isValid = false;
            errors["price"] = "Please enter valid decimal number.";
         }        
      }

      if (!comparePrice) {
         isValid = false;
         errors["comparePrice"] = "Please enter a compare price";
      }

      if (typeof comparePrice !== "undefined") {
         var pattern = new RegExp(/^(\d+|\d+.\d{2})$/);

         if (!pattern.test(comparePrice)) {
            isValid = false;
            errors["comparePrice"] = "Please enter valid decimal number.";
         }
      }
      
      if (!stock) {
         isValid = false;
         errors["stock"] = "Please enter a stock";
      }
      
      if (typeof stock !== "undefined") {
         var pattern = new RegExp(pattern=/^[0-9\b]+$/);

         if (!pattern.test(stock)) {
            isValid = false;
            errors["stock"] = "Please enter valid integer number.";
         }
      }

      if (!shippingTypeId) {
         isValid = false;
         errors["shippingTypeId"] = "Please select a shipping type";
      }

      if (showPickupStoreElements === "block") {
         if (showAddPickupStoreAddress === "block") {
            if (!storeName) {
               isValid = false;
               errors["storeName"] = "Please enter a store name";
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
         } 
      }

      setErrorsValidation(errors)

      return isValid;
   }

   useEffect(() => {
      getCurrentUser()
      getShippingTypes()
   }, [])


   return (
      <div className="create-deal-product-main-wrapper">
         <NavigationBar />

         <div className="form-preview-deal-product">
            <div className="deal-form">
               <div className="title-clear-text">
                  <p>Create new deal</p>
                  <button type="button" onClick={handleClearInputs}>Clear text</button>
               </div>

               <form onSubmit={handleSubmitNewDeal} className="form">
                  <div className="form-group">
                     <label htmlFor="title"><b>Title</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={title}
                        onChange={({ target }) => { setTitle(target.value) }}
                        name="title"
                        placeholder='Title'
                     />
                     <div className="error-validation">{errorsValidation.title}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="image"><b>Image</b></label>
                     <DropzoneComponent
                        name="image"
                        ref={thumbImage1Ref}
                        config={componentConfig()}
                        djsConfig={djsConfig()}
                        eventHandlers={handleThumbDrop1()}
                     >
                        <div className="dz-message">Drop the image here to upload</div>
                     </DropzoneComponent>
                     <div className="error-validation">{errorsValidation.thumbImage1}</div>

                     {/* <DropzoneComponent
                        ref={thumbImage2Ref}
                        config={componentConfig()}
                        djsConfig={djsConfig()}
                        eventHandlers={handleThumbDrop2()}
                     /> */}
                  </div>

                  <div className="form-group">
                     <label htmlFor="description"><b>Description</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={description}
                        onChange={({ target }) => { setDescription(target.value) }}
                        name="description"
                        placeholder='Description'
                     />
                     <div className="error-validation">{errorsValidation.description}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="price"><b>Price (two decimal position after the period)</b></label>
                     <input type='text'
                        
                        className='new-entry-input'
                        value={price}
                        onChange={({ target }) => { setPrice(target.value) }}
                        name="price"
                        placeholder='0.00'
                     />
                     <div className="error-validation">{errorsValidation.price}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="compare_price"><b>Compare Price (two decimal position after the period)</b></label>
                     <input type='text'
                        
                        className='new-entry-input'
                        value={comparePrice}
                        onChange={({ target }) => { setComparePrice(target.value) }}
                        name="compare_price"
                        placeholder='0.00'
                     />
                     <div className="error-validation">{errorsValidation.comparePrice}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="stock"><b>Stock</b></label>
                     <input type='number'
                        className='new-entry-input'
                        value={stock}
                        onChange={({ target }) => { setStock(target.value) }}
                        name="stock"
                        placeholder='Stock'
                     />
                     <div className="error-validation">{errorsValidation.stock}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="squ"><b>SQU</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={squ}
                        onChange={({ target }) => { setSqu(target.value) }}
                        name="squ"
                        placeholder='SQU'
                     />
                     <div className="error-validation">{errorsValidation.squ}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="shipping">Shipping Type</label>
                     <select className='new-entry-input'
                        value={shippingTypeId}
                        onChange={({ target }) => {
                           setShippingTypeId(target.value)

                           target.value === "2" ? (
                              getPickupAddress(),
                              handlePickupStore(target.value)                              
                           ) : (
                                 handlePickupStore(target.value)                                 
                              )
                        }}
                        id="shipping"
                     >
                        <option value=''>Select a shipping type</option>
                        {shippingTypesCatalog.map((item, index) =>
                           <option
                              value={item.shipping_type_id}
                              key={index}
                           >
                              {item.shipping_type_title}
                           </option>
                        )}
                     </select>
                     <div className="error-validation">{errorsValidation.shippingTypeId}</div>
                  </div>

                  <div className="pickup-store-group" style={{ display: `${showPickupStoreElements}` }}>
                     {Object.entries(pickupStoreAddress).length > 0 ? 
                        (
                           <div className="pickup_store_addres_info">
                              <p>Address to pick the product up</p>
         
                              <p>{`Store: ${pickupStoreAddress.user_name}`}</p>
                              <p>{`${pickupStoreAddress.pickup_line_1} ${pickupStoreAddress.pickup_line_2}`}</p>
                              <p>{`${pickupStoreAddress.pickup_city}, ${pickupStoreAddress.pickup_state}`}</p>
                              <p>{`${pickupStoreAddress.pickup_zip_code}, ${pickupStoreAddress.pickup_country}`}</p>
                           </div>
                        )
                        :
                        (
                           <p>There's no address for pick up to the store</p>
                        )
                     }                    

                     <div className="checbox-add-pickup-address">
                        <input
                           type="checkbox"
                           name="add-address"
                           checked={checkBoxChecked}
                           onChange={handleChangeCheckbox}
                        />
                        <label htmlFor="add-address"><b>Update the address to pick up the product</b></label>
                     </div>

                     <div className="pickup-store-inputs" style={{ display: `${showAddPickupStoreAddress}` }}>
                        <div className="name">
                           <div className="form-group">
                              <label htmlFor="store-name"><b>Store name</b></label>
                              <input type='text'
                                 className='new-entry-input'
                                 value={storeName}
                                 onChange={({ target }) => { setStoreName(target.value) }}
                                 name="store-name"
                                 placeholder='Store name'
                              />
                              <div className="error-validation">{errorsValidation.storeName}</div>
                           </div>
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
                                 disabled="disabled"
                              />                              
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="buttons">
                     <button type="button" onClick={handlePreviewDealProduct}>Preview</button>
                     <button type="submit">Create Deal and Generate URL</button>
                  </div>

                  <div className="spinner" style={{ display: showSpinner }}>
                     <FontAwesomeIcon icon="spinner" spin /><p>Loading</p>                     
                  </div>
               </form>

               <div className="url-generated">
                  <div className="deal-info-title">
                     Deal information
                  </div>

                  <div className="started-finished-deal-date">
                     <div className="date">
                        <p>Deal Started Date</p>
                        <p>{startedDealDate}</p>
                     </div>

                     <div className="date">
                        <p>Deal Finish Date</p>
                        <p>{finishedDealDate}</p>
                     </div>
                  </div>
                  <p className="title">Deal Product URL</p>

                  <div className="url-copy-button">
                     <div className="url">
                        <p>{urlGenerated}</p>
                     </div>

                     <div className="copy-button">
                        <CopyToClipboard text={urlGenerated}>
                           <button>Copy URL</button>
                        </CopyToClipboard>
                     </div>
                  </div>
               </div>
            </div>

            <div className="preview-deal">
               <div className="title">
                  Mobile Device
               </div>

               <div className="content">
                  {previewShow === "none" ?
                     (
                        <div className="preview-text">
                           <p>Preview</p>
                        </div>
                     )
                     :
                     (
                        <div className="preview">
                           <PreviewDealProduct
                              thumbImage1={thumbImage1.dataURL}
                              title={title}
                              description={description}
                              price={price}
                              comparePrice={comparePrice}
                              stock={stock}
                           />
                        </div>
                     )
                  }

               </div>
            </div>
         </div>
      </div >
   )
}