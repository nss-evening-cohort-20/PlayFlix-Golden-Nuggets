import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginContainer } from "./auth/LoginContainer";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";


export const PlayFlix = () => {
  const [userCheck, setUserCheck] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((token)=>{sessionStorage.setItem("token", token)})
        setUserCheck(true);
      } else {
        setUserCheck(false);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/login"
        element={
          <LoginContainer navigate={navigate} userCheck={userCheck} setUserCheck={setUserCheck} registerModal={registerModal} setRegisterModal={setRegisterModal} />} />
      <Route path="/register" element={
        <LoginContainer
          navigate={navigate}
          userCheck={userCheck}
          setUserCheck={setUserCheck}
          registerModal={registerModal}
          setRegisterModal={setRegisterModal}
        />
      } />
      <Route
        path="*"
        element={
          <Authorized userCheck={userCheck} auth={auth}>
            <>
              <ApplicationViews navigate={navigate} userCheck={userCheck} setUserCheck={setUserCheck} />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
