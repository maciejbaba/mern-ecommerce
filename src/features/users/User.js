import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import "../../css/User.css";

const changeDateFormat = (mongoDBDate) => {
  // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
  const ddmmyyyyDate = new Date(mongoDBDate).toLocaleDateString();
  return ddmmyyyyDate;
};

const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));

  return (
    <div className="user">
      <p>Username: {user.username}</p>
      <p>Status: {user.active ? "active" : "unactive"}</p>
      <p>Roles: {user.roles}</p>
      <p>Created at: {changeDateFormat(user.createdAt)}</p>
      <p>Last update: {changeDateFormat(user.updatedAt)}</p>
    </div>
  );
};

export default User;
