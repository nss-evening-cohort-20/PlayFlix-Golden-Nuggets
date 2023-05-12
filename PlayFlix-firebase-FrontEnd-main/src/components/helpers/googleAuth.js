import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  inMemoryPersistence} from "firebase/auth";
import { doesUserExist, getUserFromDB, postToSQLDB } from "./emailAuth";
import Cookies from "js-cookie";

// SignIn brings up the google sign in pop up AND works
// for both signing in AND registering a user

export const googleAuth = {
  // Works to sign in AND register a user
  signInRegister: function(navigate, setUserCheck) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' })
      const auth = getAuth();
      const userObj = {};
      setPersistence(auth, browserSessionPersistence)
      .then(async () => {

        return await signInWithPopup(auth, provider)
          .then((userCredential) => {
            const userAuth = {
            uid: userCredential.user.uid,
            type: "google"
            }
            userObj.type = userAuth.type
            userObj.uid = userCredential.user.uid
            sessionStorage.setItem("uid", userAuth.uid)
            sessionStorage.setItem("loginType", userAuth.type)
           

            doesUserExist(userCredential.user.uid)
            .then((userExists) => {
              if(!userExists) {
               return postToSQLDB(userObj, setUserCheck).then(() => {navigate("/")})
              } else {
                //gets user from db and sets user in local storage
                sessionStorage.setItem("google-uid", userObj.uid)
                return getUserFromDB(userObj.uid, setUserCheck).then(() => {
                  navigate("/")
                })
                //navigates to logged in page
                
              }
            })
          })
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
  signOut: function(navigate,  setUserCheck) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Cookies.remove(`__session`)
        setUserCheck(false)
        sessionStorage.clear();
        navigate("/login");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("Google SignOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};

