import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      setShowToast(true);
      const i = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="flex justify-center">
        <div className="card card-border bg-base-300 w-96 mx-20 ">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder=""
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  placeholder=""
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  placeholder=""
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  placeholder=""
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="m-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  placeholder=""
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>

            <p className="text-red-500 ">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
