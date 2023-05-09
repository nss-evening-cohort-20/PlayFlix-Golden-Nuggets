import { useLocation } from "react-router-dom"
import { Login } from "./Login"
import { useEffect } from "react";

export const LoginContainer = ({ navigate, setUserCheck, registerModal, setRegisterModal }) => {
    const location = useLocation();
    console.log(location)

    useEffect(() => {
        if (location.pathname.includes("register")) {
            setRegisterModal(location.pathname.includes("register"))
        }        
    },[location.pathname])

    return (
        <Login navigate={navigate} setUserCheck={setUserCheck} registerModal={registerModal} setRegisterModal={setRegisterModal} />
    )
}