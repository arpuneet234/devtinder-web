import React from "react";

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogginForm, setIsLogginForm] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("handle Login");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Error");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Error");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body">
          <h2 className="card-title">
            {isLogginForm ? "Login Page" : "Signup Page"}
          </h2>
          {!isLogginForm && (
            <>
              <div className="m-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Enter First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="m-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Enter Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div className="m-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Email Id</legend>
              <input
                type="text"
                value={email}
                className="input"
                placeholder=""
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="m-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 ">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogginForm ? handleLogin : handleSignup}
            >
              {isLogginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer"
            onClick={() => setIsLogginForm((value) => !value)}
          >
            {isLogginForm
              ? "New User? Signup Here"
              : "Existing User Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
