import { RegisterModal } from "../modal/RegisterModal";



export const Register = ({navigate, setUserCheck, registerModal, setRegisterModal}) => {
  

  return (
  <>
    <RegisterModal
      navigate={navigate}
      setUserCheck={setUserCheck} 
      registerModal={registerModal} 
      setRegisterModal={setRegisterModal}
    />
  </> 
  );
};