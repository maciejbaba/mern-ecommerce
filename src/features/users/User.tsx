import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { useSelector } from "react-redux";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";

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

const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));
  const navigate = useNavigate();

  const [deleteUser, { isLoading, isError, error }] = useDeleteUserMutation();

  const handleEditUser = (e) => {
    e.preventDefault();
    navigate(`/users/editUser/${user.id}`);
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteUser(user);
    if (isError) return alert(error);
    navigate("/users");
    alert("User deleted");
  };

  return (
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
};

export default User;
