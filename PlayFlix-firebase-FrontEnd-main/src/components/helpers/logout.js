import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: function(navigate, setUserState, setUserCheck, userCheck, userState) {
    // const userRecord = JSON.parse(sessionStorage.getItem("PlayFlix_user"));
    const userRecord = userState
    if (userRecord?.type === "google" && userCheck === true) {
      googleAuth.signOut(navigate, setUserState, setUserCheck);
    } else if (userRecord?.type === "email" && userCheck === true) {
      emailAuth.signOut(navigate, setUserState, setUserCheck);
    }
  },
};
