import React, { useState } from "react";
import { emailAuth } from "../helpers/emailAuth";
import { googleAuth } from "../helpers/googleAuth";
import "./Login.css";
import PlayFlix_Logo from "../img/PlayFlix_Logo.png";
import GoogleButton from 'react-google-button'
import { Button, Modal, Form } from "react-bootstrap";


export const Login = ({navigate, setUserCheck, registerModal, setRegisterModal}) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const updateLogin = (evt) => {
    const copy = { ...login };
    copy[evt.target.id] = evt.target.value;
    setLogin(copy);
  };

  // Login With Email & Password
  const onSubmitLoginEmail = async (e) => {
    e.preventDefault();
    emailAuth.signIn(login, navigate, setUserCheck);
  };

  const handleClose = () => {
    navigate("/login")
    setRegisterModal(false)
  }
  
  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    emailAuth.register(login, navigate, setUserCheck)
    setRegisterModal(false)
  };

  const updateUser = (evt) => {
    const copy = { ...login };
    copy[evt.target.id] = evt.target.value;
    setLogin(copy);
  };

  // Login with Google
  const onSubmitLoginGoogle = async () => {
    googleAuth.signInRegister(navigate, setUserCheck);
  };
  const handleModal = () => {
    navigate("/register")
  }
  return (
    
    <div className="background">
        
    <main className="container--login">
    
      <section className="login-section">
      <div className="playflix-logo"><img src={PlayFlix_Logo} alt="PlayFlix" />
      </div>
        <form className="form--login" onSubmit={onSubmitLoginEmail}>
        
          {/* <img className="retroGamesBackgrond" src={logoBackground} alt= "retro games" />          */}
        <div className="Text">
          <h1>Unlimited Games</h1>
          <h3>Game Anywhere. Game Anytime</h3>
          <p>Ready to Game? Enter your email to create or restart your membership.</p>
          </div>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={login.email}
              id="email"
              onChange={(evt) => updateLogin(evt)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              value={login.password}
              id="password"
              onChange={(evt) => updateLogin(evt)}
              className="form-control"
              placeholder="password"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
        <Button variant="secondary" onClick={() => {handleModal()}}>Register</Button>
      <GoogleButton
  type="light" // can be light or dark
  onClick={() => { onSubmitLoginGoogle() }}/>
      </section>
      
    </main>
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
                    <Button style={{width: "100%"}} size="lg" variant="primary" onClick={(e) => {handleRegister(e)}}>Register</Button> 
                </Modal.Footer>
      </Modal>
    </div>
  );
};
