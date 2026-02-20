import React from "react";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, age, about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>

          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">IGNORE</button>
            <button className="btn btn-secondary">INTERESTED</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
