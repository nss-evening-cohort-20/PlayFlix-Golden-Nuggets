import { Route, Routes, useNavigate } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";


export const PlayFlix = () => {
  const [userCheck, setUserCheck] = useState(false);
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
      {!sessionStorage.getItem("uid") ? (
        <>
          <Route
            path="/login"
            element={
              <Login userCheck={userCheck} setUserCheck={setUserCheck} />
            }
          />
          <Route
            path="/register"
            element={
              <Register userCheck={userCheck} setUserCheck={setUserCheck} />
            }
          />
          <Route
            path="*"
            element={
              <Login userCheck={userCheck} setUserCheck={setUserCheck} />
            }
          />
        </>
      ) : (
        <Route
          path="*"
          element={
            <ApplicationViews
              navigate={navigate}
              userCheck={userCheck}
              setUserCheck={setUserCheck}
            />
          }
        />
      )}
    </Routes>
  );
};
