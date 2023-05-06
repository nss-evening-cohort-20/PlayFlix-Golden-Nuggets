import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const PlayFlix = () => {
  const [userState, setUserState] = useState({})
  const [userCheck, setUserCheck] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setUserState(user)
        setUserCheck(true)
      } else {
        setUserState({})
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
          <Authorized userCheck={userCheck} userState={userState}>
            <>
              <ApplicationViews navigate={navigate} userCheck={userCheck} setUserCheck={setUserCheck} />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
