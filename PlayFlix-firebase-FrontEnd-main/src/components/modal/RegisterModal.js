import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { emailAuth } from "../helpers/emailAuth";
import { useNavigate } from "react-router-dom";

export const RegisterModal = ({navigate, setUserCheck, registerModal, setRegisterModal}) => {
    const [user, setUser] = useState({
        email: "",    
        password: "",
      });

    const handleClose = () => {
        setRegisterModal(false)
        navigate("login")
    }
      
      // Register with email and password
      const handleRegister = async (e) => {
        e.preventDefault();
        emailAuth.register(user, navigate, setUserCheck)
        setRegisterModal(false)
      };
    
      const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
      };
    
    return (
        <>
            <Modal show={registerModal} onHide={handleClose}>
                <Modal.Header closeButton={handleClose}>
                    <Modal.Title>Register Here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                            type="email" 
                            placeholder="Enter Email"        
                            onChange={updateUser}
                            required
                            autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            required
                            autoFocus
                            onChange={updateUser} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>                   
                    <Button style={{width: "100%"}} size="lg" variant="primary" onClick={() => {handleRegister()}}>Register</Button> 
                </Modal.Footer>
            </Modal>
        </>
    )
}