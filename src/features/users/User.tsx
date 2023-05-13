import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { useSelector } from "react-redux";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import MyButton from "../../components/myButton";
import { EntityId } from "@reduxjs/toolkit";

export const changeDateFormat = (mongoDBDate: string): string => {
  // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
  // function is only used with mongoDB dates that are auto generated so they should exist but just in case
  if (typeof mongoDBDate !== "string") return "Not a string";
  if (!mongoDBDate) return "Empty date";

  const ddmmyyyyDate: string = new Date(mongoDBDate).toLocaleDateString(
    "en-GB"
  );
  return ddmmyyyyDate;
};

type UserProps = {
  id: EntityId;
};

const User = ({ id }: UserProps) => {
  const user = useSelector((state: RootState) => selectUserById(state, id));
  const navigate = useNavigate();

  const [deleteUser, { isLoading, isError, error }] = useDeleteUserMutation();

  const handleDeleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    deleteUser(user);
    if (isError) return alert(error);
    navigate("/users");
    alert("User deleted");
  };

  let content;

  if (!user) {
    content = <p>User not found</p>;
  } else {
    const handleEditUser = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      navigate(`/users/editUser/${user.id}`);
    };

    content = (
      <div className="user">
        <p>Username: {user.username}</p>
        <p>Status: {user.active ? "Active" : "Unactive"}</p>
        <p>isAdmin: {user.isAdmin ? "Yes" : "No"}</p>
        <p>Created at: {changeDateFormat(user.createdAt)}</p>
        <p>Last update: {changeDateFormat(user.updatedAt)}</p>
        <div className="user__buttons">
          <MyButton onClick={handleEditUser}>Edit</MyButton>
          <MyButton onClick={handleDeleteUser}>Delete</MyButton>
        </div>
        {isLoading && <p>Deleting user...</p>}
      </div>
    );
  }

  return content;
};

export default User;
