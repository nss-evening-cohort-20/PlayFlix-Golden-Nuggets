import { Login } from "./Login"

export const LoginContainer = ({navigate, setUserCheck, registerModal, setRegisterModal}) => {
    return (
        <Login navigate={navigate} setUserCheck={setUserCheck} registerModal={registerModal} setRegisterModal={setRegisterModal} />
    )
}