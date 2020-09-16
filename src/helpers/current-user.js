import axios from "axios";
import Cookies from 'js-cookie'

const getCurrentUser = () => {
   let userCookie = Cookies.get("_sb%_user%_session")
   let user = {}
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
               user = response.data

               console.log('user', user);


               return user
            } else {
               return "Inactive user"
            }

         }).catch(error => {
            console.log('getCurrentUser error', error);
         });
   }
}

export { getCurrentUser };