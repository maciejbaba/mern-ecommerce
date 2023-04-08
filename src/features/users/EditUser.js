import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useUpdateUserMutation } from "./usersApiSlice";
import "../../css/EditUser.css";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="edit-user-main">
      <h1>Edit user</h1>
      <form action="" className="edit-user-form">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" id="confirm-password" />
        <label htmlFor="admin" id="admin">
          Admin
        </label>
        <input type="checkbox" id="admin" />

        <button onClick={(e) => handleEdit(e)}>Submit</button>
        <button type="reset">Reset</button>
      </form>
    </main>
  );
};

export default EditUser;
