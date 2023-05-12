import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  SignInMethod,
  getIdToken,
} from "firebase/auth";

const _apiUrl = "https://localhost:7215/api"

//check our API to ensure that the firebase user that was just logged exists in our local SQL database
export const doesUserExist = async (firebaseUserId) => {
  
  return getToken()
    .then((token) => fetch(`${_apiUrl}/Users/uid/${firebaseUserId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json())).catch((error) => console.log(error))
  
}

//extract token from firebase response and return it here
export const getToken = async () => {
  const auth = await getAuth();
  console.log({auth})
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};

export const getUserFromDB = async (firebaseUserId, setUserCheck) => {
  const token = await getToken();
  const get = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = await fetch(`${_apiUrl}/Users/uid/${firebaseUserId}`, get)
  const response = await request.json().then(() => {setUserCheck(true)});
  
  
}

export const postToSQLDB = async(userObj, setUserCheck) => {
  const token = await getToken();
  const post = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  }
  const req = await fetch(`${_apiUrl}/Users`, post);
  const resp = await req.json().then(() => {setUserCheck(true)});
  
}

export const emailAuth = {
  // Register New User
  register: function(userObj, navigate, setUserCheck) {
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
                  postToSQLDB(userObj, setUserCheck).then(() => emailAuth.signIn(userObj, navigate, setUserCheck));  
              } else {
                // if this is CREATING a user and checks to see if it exists already why would it store in localstorage?
                alert("User already exists", navigate("/login"))
                // Navigate us back to home
              }
            })
          }
        )
      .catch((error) => {
        console.log("Email Register Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
  // Sign in existing user
  signIn: function(userObj, navigate, setUserCheck) {
    return new Promise((res) => {
      const auth = getAuth();
      const existingUser = {};
      setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const SignInResponse = await signInWithEmailAndPassword(auth, userObj.email, userObj.password);
        const userAuth = {
          uid: SignInResponse.user.uid,
          type: "email"
          }
        existingUser.email = SignInResponse.user.email;
        existingUser.uid = SignInResponse.user.uid;
        existingUser.type = "email";
        sessionStorage.setItem("uid", userAuth.uid)
        sessionStorage.setItem("loginType", userAuth.type)
        doesUserExist(SignInResponse.user.uid)
          .then((userExists) => {
            if (!userExists) {
              navigate("/register");
              this.signOut();
            } else {
              getUserFromDB(existingUser.uid, setUserCheck).then(() => {
                navigate("/");
              });
            }
          });
        })
        .catch((error) => {
          console.log("Email SignIn Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          navigate("/register")
        })
    });
  },
  // Sign out
  signOut: function(navigate, setUserCheck) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("uid")
        setUserCheck(false)
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