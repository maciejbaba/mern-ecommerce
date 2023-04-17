import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "./usersApiSlice";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";

const User = ({ id }) => {
  const user = useSelector(state => selectUserById(state, id));
  const navigate = useNavigate();

  const changeDateFormat = mongoDBDate => {
    // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
    const ddmmyyyyDate = new Date(mongoDBDate).toLocaleDateString();
    return ddmmyyyyDate;
  };

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const handleEditUser = (e) => {
    e.preventDefault();
    navigate(`/users/editUser/${user.id}`);
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteUser(user);
    navigate("/users"); // todo add a confirmation message
  };

  let content;

  return (
    <div className="user">
      <p>Username: {user.username}</p>
      <p>Status: {user.active ? "Active" : "Unactive"}</p>
      <p>isAdmin: {user.isAdmin ? "Yes" : "No"}</p>
      <p>Created at: {changeDateFormat(user.createdAt)}</p>
      <p>Last update: {changeDateFormat(user.updatedAt)}</p>
      <div className="user-buttons">
        <button onClick={handleEditUser}>Edit</button>
        <button onClick={handleDeleteUser}>Delete</button>
      </div>
    </div>
  );
};

export default User;
