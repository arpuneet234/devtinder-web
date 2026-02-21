import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const reviewRequest = async (status, requestId, userName) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
      showToast(`You ${status} connection request from ${userName}`, "success");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to process request",
        "error",
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className="toast toast-top toast-center z-50 fixed">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* No Pending Requests */}
      {requests.length === 0 ? (
        <div className="text-center my-20">
          <h2 className="text-2xl font-bold text-gray-500">
            No pending requests
          </h2>
          <p className="text-gray-400 mt-2">
            You don't have any connection requests at the moment
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connection Requests
            </h1>
            <p className="text-gray-500 mt-2">
              You have {requests.length} pending request
              {requests.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Requests Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="card bg-base-100 shadow-xl w-80"
              >
                <div className="card-body">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            request.fromUserId?.photoUrl ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                          alt={request.fromUserId?.firstName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title">
                        {request.fromUserId?.firstName}{" "}
                        {request.fromUserId?.lastName}
                      </h2>
                      {request.fromUserId?.age &&
                        request.fromUserId?.gender && (
                          <p className="text-sm text-gray-500">
                            {request.fromUserId.age} years •{" "}
                            {request.fromUserId.gender}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* About Section */}
                  {request.fromUserId?.about && (
                    <div className="mt-4 p-3 bg-base-200 rounded-lg">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {request.fromUserId.about}
                      </p>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mt-2">
                    <span className="badge badge-warning badge-sm">
                      Pending
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions justify-between mt-4">
                    <button
                      className="btn btn-sm btn-success flex-1"
                      onClick={() =>
                        reviewRequest(
                          "accepted",
                          request._id,
                          request.fromUserId?.firstName,
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error flex-1"
                      onClick={() =>
                        reviewRequest(
                          "rejected",
                          request._id,
                          request.fromUserId?.firstName,
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Requests;
