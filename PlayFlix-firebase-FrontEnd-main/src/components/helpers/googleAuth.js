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
  signInRegister: function(navigate) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const userObj = {};
      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const userAuth = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          type: "google"
          }
          userObj.type = userAuth.type
          userObj.uid = userCredential.user.uid
          doesUserExist(userCredential.user.uid)
          .then((userExists) => {
            if(!userExists) {
              postToSQLDB(userObj)
            } 
          })
        }).finally(() => {
          // Navigate us back home
          sessionStorage.setItem("PlayFlix_user", JSON.stringify(userObj));
          navigate("/");
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
        sessionStorage.removeItem("PlayFlix_user");
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

