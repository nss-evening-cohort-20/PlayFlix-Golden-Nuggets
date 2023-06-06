import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { getToken } from "../helpers/emailAuth";

// Rest of the code...

export const UserProfile = () => {
  const navigate = useNavigate();

  // Get user ID from localStorage
  const localUserId = sessionStorage.getItem("uid");

  // Set default values for user profile state
  const [userProfile, setUserProfile] = useState({
    id: "",
    uId: localUserId || "",
    Type: "",
    FirstName: "",
    LastName: "",
    Bio: "",
    ProfileImg: "",
  });

  // Fetch user profile from server on component mount
  useEffect(() => {
    if (localUserId) {
        const token = sessionStorage.getItem("token")
        fetch(`https://localhost:7215/api/Users/uid/${localUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((profileArray) => {
            const ProfileImg = localStorage.getItem("ProfileImg");
            if (ProfileImg) {
              profileArray.ProfileImg = ProfileImg;
            }
            setUserProfile(profileArray);
            console.warn(userProfile);
          })
          .catch((error) => {
            console.error("Error fetching profile: ", error);
          });
    }
  }, [localUserId]);

    // Log userProfile whenever it changes
    useEffect(() => {
      console.log(userProfile);
    }, [userProfile]);

  // Handle profile picture selection
  const handleProfileImgSelect = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const ProfileImg = reader.result;
      localStorage.setItem("profileImg", ProfileImg);
      setUserProfile((prevState) => ({
        ...prevState,
        ProfileImg,
      }));
    };
  };

  // Handle save button click
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    saveUserProfile(userProfile);
  };

  // Save user profile to server
  const saveUserProfile = (profile) => {
    fetch(`https://localhost:7215/api/Users?uId=${profile.uId}`, {
      // modify URL to include uId
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
        <input type="file" accept="image/*" onChange={handleProfileImgSelect} />

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
};
