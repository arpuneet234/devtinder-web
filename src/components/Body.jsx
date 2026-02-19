import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("res");
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
    }
  };
  useEffect(() => {
    console.log(userData);
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Body;
