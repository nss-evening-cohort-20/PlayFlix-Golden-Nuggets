import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doesUserExist, postToSQLDB } from "./emailAuth";

// SignIn brings up the google sign in pop up AND works
// for both signing in AND registering a user

export const googleAuth = {
  // Works to sign in AND register a user
  signInRegister: function(navigate, userObj) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const userAuth = {};
      signInWithPopup(auth, provider)
        .then((userCredential) => {
          
          userAuth.email = userCredential.user.email,
          userAuth.uid = userCredential.user.uid,
          userAuth.type = "google",
          
          doesUserExist(userCredential.user.uid)
          .then((userExists) => {
            if(!userExists) {
              userObj.uid = userCredential.user.uid
              userObj.type = userAuth.type
              postToSQLDB(userObj, userAuth)
            } else {
              sessionStorage.setItem("PlayFlix_user", JSON.stringify(userAuth));
              navigate("/");
            }
          })
        }).finally(() => {
          sessionStorage.setItem("PlayFlix_user", JSON.stringify(userAuth));
          // Navigate us back home
          navigate("/");
          console.log("you did it");
        })
        .catch((error) => {
          console.log("Google Sign In Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          console.log("error email", error.email);
        });
    });
  },
  // Sign out a user
  signOut: function(navigate) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Remove user from localStorage
        sessionStorage.removeItem("capstone_user");
        // Navigate us back home
        navigate("/");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("Google SignOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};

