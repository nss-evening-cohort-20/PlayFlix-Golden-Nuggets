import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const _apiUrl = "https://localhost:7215/api"

//check our API to ensure that the firebase user that was just logged exists in our local SQL database
const doesUserExist = (firebaseUserId) => {
  
  return getToken()
    .then((token) => fetch(`${_apiUrl}/Users/uid/${firebaseUserId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json()))
  
}

//extract token from firebase response and return it here
export const getToken = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};

const postToSQLDB = async(userObj, userAuth) => {
  const token = await getToken();
  await fetch(`${_apiUrl}/Users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  });         
}

export const emailAuth = {
  // Register New User
  register: function(userObj, navigate) {
    const auth = getAuth();
    const userAuth = {}; 
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
              userAuth.email = userCredential.user.email;
              userAuth.uid = userCredential.user.uid;
              userAuth.type= "email";
              
            doesUserExist(userCredential.user.uid)
            .then((userExists) => {
              if (!userExists)  {
                  //creates new user and pushes uid to local database need to figure out the bearer token thing since it returns a 401
                  userObj.uid = userCredential.user.uid;
                  userObj.type = userAuth.type;
                  postToSQLDB(userObj, userAuth);  
              } else {
                // if this is CREATING a user and checks to see if it exists already why would it store in localstorage?
                alert("User already exists", navigate("/login"))
                // Navigate us back to home
              }
            })
          },
          function(error) {
            console.log("Email Register Name Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
          }
        ).then(() => {
          sessionStorage.setItem("PlayFlex_user", JSON.stringify(userAuth))
          navigate("/")
        })
      .catch((error) => {
        console.log("Email Register Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
  // Sign in existing user
  signIn: function(userObj, navigate) {
    return new Promise((res) => {
      const auth = getAuth();
      const existingUser = {};
      signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((SignInResponse) => {
          existingUser.email = SignInResponse.user.email;
          existingUser.uid = SignInResponse.user.uid;
          existingUser.type = "email";  
          doesUserExist(SignInResponse.user.uid)
          .then((userExists) => {
            if (!userExists) {
              
              navigate("/register")
              this.signOut();
            } else {
              existingUser.displayName = "Blank"
              // Saves the user to localstorage
              sessionStorage.setItem("PlayFlex_user", JSON.stringify(existingUser));
              // Navigate us back to home
              navigate("/");
              console.log(existingUser.displayName + "Signed In")
            }
          })
        }
        )
        .catch((error) => {
          console.log("Email SignIn Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          navigate("/register")
        });
    });
  },
  // Sign out
  signOut: function(navigate) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Remove the user from localstorage
        sessionStorage.removeItem("capstone_user");
        // Navigate us back to home
        navigate("/");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("signOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};