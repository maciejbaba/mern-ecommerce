import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";

const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));

  return (
    <div>
      <p>{user.username}</p>
    </div>
  );
};

export default User;
