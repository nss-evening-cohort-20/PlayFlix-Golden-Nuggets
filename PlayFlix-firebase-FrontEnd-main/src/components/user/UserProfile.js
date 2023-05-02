import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./EditProfile";

export const UserProfile = () => {
  const navigate = useNavigate();

  // Get user profile from localStorage
  const localProjectUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localProjectUser);

  // Set default values for user profile state
  const [userProfile, setUserProfile] = useState({
    id: projectUserObject.id,
    uId: projectUserObject.uId,
    Type: projectUserObject.Type,
    FirstName: projectUserObject.FirstName,
    LastName: projectUserObject.LastName,
    Bio: projectUserObject.Bio,
    ProfileImg: projectUserObject.ProfileImg
  });

  // Handle profile picture selection
  const handleProfileImgSelect = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const ProfileImg = reader.result;
      localStorage.setItem("profileImg", ProfileImg); // <-- Save profile picture in local storage
      setUserProfile((prevState) => ({
        ...prevState,
        ProfileImg,
      }));
    };
  };

  // Fetch user profile from server on component mount
  useEffect(() => {
    fetch(`'https://localhost:7215/api/Users'${projectUserObject.id}`)
      .then((response) => response.json())
      .then((profileArray) => {
        // Check if profile picture is saved in local storage
        const ProfileImg = localStorage.getItem("ProfileImg");
        if (ProfileImg) {
          profileArray.ProfileImg = ProfileImg;
        }
        setUserProfile(profileArray);
      });
  }, []);

  // Handle save button click
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    saveUserProfile(userProfile);
  };

  // Save user profile to server
  const saveUserProfile = (profile) => {
    fetch(`'https://localhost:7215/api/Users'${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Type: profile.Type,
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        Bio: profile.Bio,
        ProfileImg: profile.ProfileImg,
      }),
    })
      .then((response) => response.json())
      .then((updatedProfile) => {
        setUserProfile(updatedProfile);
        alert("Profile saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving profile: ", error);
      });
  };

  return (
    <>
      <h3>
        Welcome, {userProfile.FirstName} {userProfile.LastName}
      </h3>

      <article className="userProfile">
        {userProfile.ProfileImg && (
          <img src={userProfile.ProfileImg} alt="Profile Picture" />
        )}

        <h2>Profile Picture:</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImgSelect}
        />

        <h2>Name:</h2>
            <h2>Name:</h2>
            <header>{userProfile.FirstName}</header>
            <header>{userProfile.LastName}</header>
    
            <h2>Type:</h2>
            <div>{userProfile.Type}</div>
    
            <h2>Bio:</h2>
            <div>{userProfile.Bio}</div>

            <h2>Profile Pic</h2>
            <div>{userProfile.ProfileImg}</div>
    
            <button
              className="btn comment_edit"
              onClick={() => {
                navigate(`/EditProfile/${userProfile.id}`);
              }}
            >
              Edit
            </button>
            <section>
              <button
                className="btn comment_delete"
                onClick={() => {
                  navigate(`/DeleteProfile/${userProfile.id}`);
                }}
              >
                Delete
              </button>
              <button
              className="btn comment_save"
              onClick={() => {
                navigate(`/UserProfile/${userProfile.id}`);
              }}
            >
              Save
              </button>
            </section>
            <section></section>
          </article>
        </>
      );
    }
   
    
    
