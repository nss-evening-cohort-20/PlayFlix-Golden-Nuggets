import { useState } from "react";
import { googleAuth } from "../helpers/googleAuth";
import { emailAuth } from "../helpers/emailAuth";
import "./Login.css";
import { useNavigate } from "react-router-dom";


export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    uid: "",
    type: "",
    password: "",
    bio: "",
    profileImg: "",
  });
  let navigate = useNavigate();
  // Register with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    emailAuth.register(user, navigate)
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };


  const localUser = () => {
    return JSON.parse(localStorage.getItem("capstone_user"))
  }

  const postToSQLDB = async (localUser) => {
    user.uid = localUser
    await fetch("https://localhost:7215/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
  };

  // Register with google (same as sign in)
  const onSubmitLogin = async () => {
    
    googleAuth.signInRegister(navigate);

  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
        <fieldset>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={updateUser}
            type="text"
            id="firstName"
            className="form-control"
            placeholder="Enter your first name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={updateUser}
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Enter your last name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input
            onChange={updateUser}
            type="password"
            id="password"
            className="form-control"
            placeholder="Must Be 6 Characters"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="bio">Bio</label>
          <input
            onChange={updateUser}
            type="text"
            id="bio"
            className="form-control"
            placeholder="Tell us about yourself"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="profileImg">Profile Image</label>
          <input
            onChange={updateUser}
            type="text"
            id="profileImg"
            className="form-control"
            placeholder="Image URL goes here"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
      <h2>Register With Google?</h2>
      <button type="submit" onClick={onSubmitLogin}>
        Let's Do It!
      </button>
    </main>
  );
};