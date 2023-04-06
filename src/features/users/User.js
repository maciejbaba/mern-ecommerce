import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "./usersApiSlice";
import "../../css/User.css";

const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));

  const changeDateFormat = (mongoDBDate) => {
    // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
    const ddmmyyyyDate = new Date(mongoDBDate).toLocaleDateString();
    return ddmmyyyyDate;
  };

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const handleEditUser = () => {};

  const handleDeleteUser = () => {
    deleteUser(user);
  };

  return (
    <div className="user">
      <p>Username: {user.username}</p>
      <p>Status: {user.active ? "active" : "unactive"}</p>
      <p>Roles: {user.roles}</p>
      <p>Created at: {changeDateFormat(user.createdAt)}</p>
      <p>Last update: {changeDateFormat(user.updatedAt)}</p>
      <button onClick={handleEditUser}>Edit</button>
      <button onClick={handleDeleteUser}>
        Delete
      </button>
    </div>
  );
};

export default User;
