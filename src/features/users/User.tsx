import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { useSelector } from "react-redux";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import MyButton from "../../components/MyButton";
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
    if (!user) return;
    deleteUser({ id: user.id });
    if (isError) return alert(error);
    navigate("/admin/users");
    alert("User deleted");
  };

  let content;

  if (!user) {
    // change this nesting to returns instead of content
    content = <p>User not found</p>;
  } else {
    const handleEditUser = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      navigate(`/admin/users/edit/${user.id}`);
    };

    content = (
      <div className="user">
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>
        <p>
          <strong>Status: </strong>
          {user.active ? "Active" : "Unactive"}
        </p>
        <p>
          <strong>isAdmin: </strong>
          {user.isAdmin ? "Yes" : "No"}
        </p>
        <p>
          <strong>Created at: </strong>
          {changeDateFormat(user.createdAt)}
        </p>
        <p>
          <strong>Last update: </strong>
          {changeDateFormat(user.updatedAt)}
        </p>
        <div className="user__buttons">
          <MyButton className="user__edit-button" onClick={handleEditUser}>
            Edit user
          </MyButton>
          <MyButton className="user__delete-button" onClick={handleDeleteUser}>
            Delete user
          </MyButton>
        </div>
        {isLoading && <p>Deleting user...</p>}
      </div>
    );
  }

  return content;
};

export default User;
