import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";
import Cookies from "js-cookie";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: function(navigate, setUserCheck,) {
    const user = sessionStorage.getItem("firebase:authUser:AIzaSyCBSUB6tbhxaGfVsvX5_sBEo2E9HzWNbJg:[DEFAULT]")
    const userCookie = Cookies.get();
    if (userCookie) {
      googleAuth.signOut(navigate, setUserCheck);
    } else if (user) {
      emailAuth.signOut(navigate, setUserCheck);
    }
  },
};
