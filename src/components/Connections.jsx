import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log(res);
    dispatch(addConnection(res?.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="text-center my-20">
        <h2 className="text-2xl font-bold text-gray-500">
          No Connections Found
        </h2>
        <p className="text-gray-400 mt-2">
          You don't have any connection at the moment
        </p>
      </div>
    );
  console.log(connections);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Connections
        </h1>
        <p className="text-gray-500 mt-2">
          You have {connections.length} connection
          {connections.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Connections Flex Container - wraps automatically */}
      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-80"
          >
            <div className="card-body">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        connection.photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={connection.firstName}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="card-title">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  {connection.age && connection.gender && (
                    <p className="text-sm text-gray-500">
                      {connection.age} years • {connection.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* About Section */}
              {connection.about && (
                <div className="mt-4 p-3 bg-base-200 rounded-lg">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {connection.about}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-outline btn-primary">
                  View Profile
                </button>
                <button className="btn btn-sm btn-primary">Message</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
