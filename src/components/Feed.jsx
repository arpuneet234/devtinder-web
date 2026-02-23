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
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <div className="text-center my-20">
        <h2 className="text-2xl font-bold text-gray-500">
          No More Users Found
        </h2>
      </div>
    );

  return (
    feed && (
      <div class className="flex justify-center m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
