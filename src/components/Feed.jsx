import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.users));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div class className="flex justify-center m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
