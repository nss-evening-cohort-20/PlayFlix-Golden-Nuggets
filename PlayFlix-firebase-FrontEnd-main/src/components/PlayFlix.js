import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { LoginContainer } from "./auth/LoginContainer";


export const PlayFlix = () => {
  const [userCheck, setUserCheck] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserCheck(true)
        auth.currentUser.getIdToken(true).then((token) => {
          Cookies.set('__session', token, { expires: 2 })
        })
      } else {
        setUserCheck(false)
      }
    })
  }, [])

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
