import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { emailAuth } from "../helpers/emailAuth";
import { googleAuth } from "../helpers/googleAuth";
import "./Login.css";
import PlayFlix_Logo from "../img/PlayFlix_Logo.png";
import logoBackground from "../img/logoBackground.png" 
import GoogleButton from 'react-google-button'


export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateLogin = (evt) => {
    const copy = { ...login };
    copy[evt.target.id] = evt.target.value;
    setLogin(copy);
  };

  // Login With Email & Password
  const onSubmitLoginEmail = async (e) => {
    e.preventDefault();
    emailAuth.signIn(login, navigate);
  };

  // Login with Google
  const onSubmitLoginGoogle = async () => {
    googleAuth.signInRegister(navigate);
  };

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
        <section className="link--register">Register
        <Link to="/register"> Here</Link>
      </section>
      {/* *<h2>Login With Google?</h2>*\ */}
      <GoogleButton
  type="light" // can be light or dark
  onClick={() => { console.log('Google button clicked') }}/>
      </section>
      
    </main>
    </div>
  );
};
