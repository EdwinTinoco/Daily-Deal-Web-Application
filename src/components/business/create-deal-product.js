import React, { useState } from "react"

import NavigationBar from "../navigation-bar/navigation-bar"
import PreviewDealProduct from "../business/preview-deal-product"

export default function CreateDealProduct(props) {
   const [title, setTitle] = useState("")
   const [image, setImage] = useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState(0)
   const [stock, setStock] = useState(0)
   const [errorsValidation, setErrorsValidation] = useState({})

   const handlePreviewDealProduct = () => {
      return (
         <PreviewDealProduct
            image={image}
            title={title}
            description={description}
            price={price}
            stock={stock}
         />
      )
   }

   const handleSubmitNewDeal = (e) => {
      e.preventDefault()

      console.log('create new deal product');

      if (validate()) {
         axios
            .post(
               'http://localhost:5000/api/ba/new-deal',
               {
                  title: title,
                  image: image,
                  description: description,
                  price: price,
                  stock: stock
               },
            )
            .then(response => {
               console.log("new deal", response.data)
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

      if (!image) {
         isValid = false;
         errors["image"] = "Please enter an image";
      }

      if (!description) {
         isValid = false;
         errors["description"] = "Please enter a description";
      }

      if (!price) {
         isValid = false;
         errors["price"] = "Please enter a price";
      }

      setErrorsValidation(errors)

      return isValid;
   }


   return (
      <div className="create-deal-product-main-wrapper">
         <NavigationBar />

         <div className="form-preview-deal-product">
            <div className="deal-form">
               <form onSubmit={handleSubmitNewDeal}>
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
                        placeholder='description'
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
                        placeholder='price'
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
                        placeholder='stock'
                     />
                     <div className="error-validation">{errorsValidation.stock}</div>
                  </div>

                  <div className="buttons">
                     <button type="button" onClick={handlePreviewDealProduct}>Preview</button>
                     <button type="submit">Create Deal and Generate URL</button>
                  </div>
               </form>
            </div>

            <div className="preview-deal">
               {handlePreviewDealProduct()}
            </div>
         </div>
      </div>
   )
}