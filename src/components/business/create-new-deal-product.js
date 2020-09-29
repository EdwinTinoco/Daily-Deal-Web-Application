import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies, { set } from 'js-cookie';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import NavigationBar from "../navigation-bar/navigation-bar"
import PreviewDealProduct from "./preview-deal-product"

export default function CreateNewDealProduct(props) {
   const [user, setUser] = useState({})
   const [dealProductId, setDealProductId] = useState(0)
   const [urlGenerated, setUrlGenerated] = useState("")
   const [title, setTitle] = useState("")
   const [image, setImage] = useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState("")
   const [stock, setStock] = useState("")
   const [shippingType, setShippingType] = useState("")
   const [startedDealDate, setStartedDealDate] = useState("")
   const [finishedDealDate, setFinishedDealDate] = useState("")
   const [previewShow, setPreviewShow] = useState("none")
   const [shippingCatalog, setShippingCatalog] = useState([])
   const [errorsValidation, setErrorsValidation] = useState({})
   const [thumbImage1, setThumbImage1] = useState("")
   const [thumbImage2, setThumbImage2] = useState("")
   const thumbImage1Ref = useRef()
   const thumbImage2Ref = useRef()

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
      setImage("")
      setDescription("")
      setPrice("")
      setStock("")
      setShippingType("")
      setPreviewShow("none")
      setErrorsValidation({})
   }

   const handlePreviewDealProduct = () => {
      console.log('thumbImage1', thumbImage1);

      if (validate()) {
         setPreviewShow("block")
      }
   }

   const handleSubmitNewDeal = (e) => {
      e.preventDefault()

      if (validate()) {
         let createDateDB = moment().format();
         let startDateDB = createDateDB;
         let finishDateDB = moment().add(1, 'days').format();

         let startDate = moment().format("MMMM Do YYYY, hh:mm:ss a");
         let finishDate = moment().add(1, 'days').format("MMMM Do YYYY, hh:mm:ss a");

         axios.post('http://localhost:5000/api/product/new-deal',
            {
               userId: user.user_id,
               title: title,
               thumbImage1: thumbImage1.dataURL,
               description: description,
               price: parseFloat(price).toFixed(2),
               stock: parseInt(stock),
               shippingType: shippingType,
               createdDealDate: createDateDB,
               startedDealDate: startDateDB,
               finishedDealDate: finishDateDB,
               dealStatus: "actived"
            })
            .then(response => {
               console.log("new deal, deal ProductId", response.data)

               setDealProductId(response.data["@productId"])
               setUrlGenerated(response.data["@generatedDealProductUrl"])
               setTitle("")
               setThumbImage1("")
               setDescription("")
               setPrice("")
               setStock("")
               setShippingType("")
               setPreviewShow("none")
               setStartedDealDate(startDate)
               setFinishedDealDate(finishDate)

               thumbImage1Ref.current.dropzone.removeAllFiles()

               // [thumbImage1Ref].forEach(ref => {
               //    ref.current.dropzone.removeAllFiles()
               // });
            })
            .catch(error => {
               console.log('handleSubmitNewDeal error', error)
            })
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

         axios.get(`http://localhost:5000/api/user/${userId}`)
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
      axios.get('http://localhost:5000/api/shipping-types')
         .then(response => {
            setShippingCatalog(response.data)
         })
         .catch(error => {
            console.log('getShippingTypes error', error);
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

      if (!stock) {
         isValid = false;
         errors["stock"] = "Please enter a stock";
      }

      if (!shippingType) {
         isValid = false;
         errors["shippingType"] = "Please select a shipping type";
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
                     <label htmlFor="price"><b>Price</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={price}
                        onChange={({ target }) => { setPrice(target.value) }}
                        name="price"
                        placeholder='Price'
                     />
                     <div className="error-validation">{errorsValidation.price}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="stock"><b>Stock</b></label>
                     <input type='text'
                        className='new-entry-input'
                        value={stock}
                        onChange={({ target }) => { setStock(target.value) }}
                        name="stock"
                        placeholder='Stock'
                     />
                     <div className="error-validation">{errorsValidation.stock}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="shipping">Shipping Type</label>
                     <select className='new-entry-input'
                        value={shippingType}
                        onChange={({ target }) => { setShippingType(target.value) }}
                        id="shipping"
                     >
                        <option value=''>Select a shipping type</option>
                        {shippingCatalog.map((item, index) =>
                           <option
                              value={item.shipping_id}
                              key={index}
                           >
                              {item.shipping_title}
                           </option>
                        )}
                     </select>
                     <div className="error-validation">{errorsValidation.shippingType}</div>
                  </div>

                  <div className="buttons">
                     <button type="button" onClick={handlePreviewDealProduct}>Preview</button>
                     <button type="submit">Create Deal and Generate URL</button>
                  </div>
               </form>

               <div className="url-generated">
                  <div className="deal-info-title">
                     Deal information
                  </div>

                  <div className="started-finished-deal-date">
                     <div className="date">
                        <p>Started Deal</p>
                        <p>{startedDealDate}</p>
                     </div>

                     <div className="date">
                        <p>Finished Deal</p>
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
                              stock={stock}
                           />
                        </div>
                     )
                  }

               </div>
            </div>
         </div>
      </div>
   )
}