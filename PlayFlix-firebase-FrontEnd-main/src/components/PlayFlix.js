import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useEffect, useState } from "react";

export const PlayFlix = () => {
  const [userState, setUserState] = useState({})
  const [userCheck, setUserCheck] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    userState ? setUserState(true) : setUserState(false)
  },[])

  return (
    <Routes>
      <Route path="/login" element={<Login userState={userState} setUserState={setUserState} userCheck={userCheck} setUserCheck={setUserCheck} />} />
      <Route path="/register" element={<Register userState={userState} setUserState={setUserState} userCheck={userCheck} setUserCheck={setUserCheck} />} />

      <Route
        path="*"
        element={
          <Authorized userState={userState} setUserState={setUserState} userCheck={userCheck} setUserCheck={setUserCheck} >
            <>
              <ApplicationViews navigate={navigate} userState={userState} setUserState={setUserState} userCheck={userCheck} setUserCheck={setUserCheck} />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
