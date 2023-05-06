import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doesUserExist, getUserFromDB, postToSQLDB } from "./emailAuth";

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
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            type: "google"
            }
            userObj.type = userAuth.type
            userObj.uid = userCredential.user.uid
            doesUserExist(userCredential.user.uid)
            .then((userExists) => {
              if(!userExists) {
                postToSQLDB(userObj, setUserCheck).then(() => {
                  navigate("/")
                })
              } else {
                //gets user from db and sets user in local storage
                getUserFromDB(userObj.uid, setUserCheck).then(() => {
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
        setUserCheck(false)
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

