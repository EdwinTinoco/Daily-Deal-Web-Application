import React, { useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'

import NavigationBar from "../navigation-bar/navigation-bar"
import PreviewDealProduct from "../business/preview-deal-product"

export default function CreateDealProduct(props) {
   const [userId, setUserId] = useState(0)
   const [dealProductId, setDealProductId] = useState(0)
   const [urlBase, setUrlBased] = useState("http://localhost:3000/deal/product/")
   const [urlGenerated, setUrlGenerated] = useState(`http://localhost:3000/deal/product/${14}`)
   const [title, setTitle] = useState("")
   const [image, setImage] = useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState()
   const [stock, setStock] = useState()
   const [previewShow, setPreviewShow] = useState("none")
   const [errorsValidation, setErrorsValidation] = useState({})

   const handlePreviewDealProduct = () => {
      if (validate()) {
         setPreviewShow("block")
      }
   }

   const handleSubmitNewDeal = (e) => {
      e.preventDefault()

      console.log('create new deal product');

      if (validate()) {
         axios
            .post(
               'http://localhost:5000/api/product/new-deal',
               {
                  userId: userId,
                  title: title.toUpperCase(),
                  image: image,
                  description: description,
                  price: price,
                  stock: stock
               },
            )
            .then(response => {
               console.log("new deal", response.data)

               setUrlGenerated(`${urlBase}${14}`)
               setTitle("")
               setImage("")
               setDescription("")
               setPrice(0)
               setStock(0)
            })
            .catch(error => {
               console.log('handleSubmitNewDeal error', error)
            })
      }
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!title) {
         isValid = false;
         errors["title"] = "Please enter a title";
      }

      // if (!image) {
      //    isValid = false;
      //    errors["image"] = "Please enter an image";
      // }

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

      setErrorsValidation(errors)

      return isValid;
   }


   return (
      <div className="create-deal-product-main-wrapper">
         <NavigationBar />

         <div className="form-preview-deal-product">
            <div className="deal-form">
               <div className="title">
                  Create new deal
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
                     <input type='text'
                        className='new-entry-input'
                        value={image}
                        onChange={({ target }) => { setImage(target.value) }}
                        name="image"
                        placeholder='Image'
                     />
                     <div className="error-validation">{errorsValidation.image}</div>
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

                  <div className="buttons">
                     <button type="button" onClick={handlePreviewDealProduct}>Preview</button>
                     <button type="submit">Create Deal and Generate URL</button>
                  </div>
               </form>

               <div className="url-generated">
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
                  Preview
               </div>

               <div className="content">
                  <div className="preview" style={{ display: `${previewShow}` }}>
                     <PreviewDealProduct
                        image={image}
                        title={title}
                        description={description}
                        price={price}
                        stock={stock}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}