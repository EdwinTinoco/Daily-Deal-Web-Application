import {
   faTrash,
   faSignOutAlt,
   faEdit,
   faSpinner,
   faEnvelope,
   faLock,
   faLink,
   faCamera,
   faBars,
   faTimes,
   faUser,
   faGlobe,
   faSearch,
   faStar,
   faAppleAlt,
   faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
   return library.add(
      faTrash,
      faSignOutAlt,
      faEdit,
      faSpinner,
      faEnvelope,
      faLock,
      faLink,
      faCamera,
      faBars,
      faTimes,
      faUser,
      faGlobe,
      faSearch,
      faStar,
      faAppleAlt,
      faPlusCircle,
   );
};

export default Icons;
