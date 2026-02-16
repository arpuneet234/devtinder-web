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
  const [email, setEmailId] = useState("puneet@gmail.com");
  const [password, setPassword] = useState("Puneet@123");

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
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body">
          <h2 className="card-title">Login Page</h2>
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
                type="text"
                value={password}
                className="input"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
