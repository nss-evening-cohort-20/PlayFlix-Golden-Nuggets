import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";
import Cookies from "js-cookie";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: function(navigate, setUserCheck,) {
    const login = sessionStorage.getItem("loginType")
    if (login === "google") {
      sessionStorage.removeItem("uid")
      sessionStorage.removeItem("loginType")
      sessionStorage.removeItem("token")
      googleAuth.signOut(navigate, setUserCheck);
    } else if (login === "email" ) {
      sessionStorage.removeItem("uid")
      sessionStorage.removeItem("loginType")
      sessionStorage.removeItem("token")
      emailAuth.signOut(navigate, setUserCheck);
    }
  },
};
