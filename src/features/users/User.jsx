import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { useSelector } from "react-redux";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";

export const changeDateFormat = mongoDBDate => {
  // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
  const ddmmyyyyDate = new Date(mongoDBDate).toLocaleDateString("en-GB");
  return ddmmyyyyDate;
};

const User = ({ id }) => {
  const user = useSelector(state => selectUserById(state, id));
  const navigate = useNavigate();

  const [deleteUser, { isLoading, isError, error }] = useDeleteUserMutation();

  const handleEditUser = e => {
    e.preventDefault();
    navigate(`/users/editUser/${user.id}`);
  };

  const handleDeleteUser = e => {
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
        <button onClick={handleEditUser}>Edit</button>
        <button onClick={handleDeleteUser}>Delete</button>
      </div>
      {isLoading && <p>Deleting user...</p>}
    </div>
  );
};

export default User;
