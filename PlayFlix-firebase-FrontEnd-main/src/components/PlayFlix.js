import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

export const PlayFlix = () => {
  const [userCheck, setUserCheck] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setUserCheck(true)
        auth.currentUser.getIdToken(true).then((token) => {
          Cookies.set('__session', token, {expires: 8})
        })
      } else {
        setUserCheck(false)
      }
    })
  },[])

  return (
    <Routes>
      <Route path="/login" element={<Login userCheck={userCheck} setUserCheck={setUserCheck} />} />
      <Route path="/register" element={<Register userCheck={userCheck} setUserCheck={setUserCheck} />} />

      <Route
        path="*"
        element={
          <Authorized userCheck={userCheck}>
            <>
              <ApplicationViews navigate={navigate} userCheck={userCheck} setUserCheck={setUserCheck} />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
