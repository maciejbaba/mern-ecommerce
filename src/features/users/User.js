import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "./usersApiSlice";
import "../../css/User.css";
import { useNavigate } from "react-router-dom";

const User = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));
  const navigate = useNavigate();

  const changeDateFormat = (mongoDBDate) => {
    // example, returns "18/03/2023" from "2023-03-18T20:06:37.926Z"
    const ddmmyyyyDate = new Date(mongoDBDate).toLocaleDateString();
    return ddmmyyyyDate;
  };

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const handleEditUser = () => {
    navigate(`/users/editUser/${user.id}`);
  };

  const handleDeleteUser = () => {
    deleteUser(user);
    navigate("/users");
  };

  return (
    <div className="user">
      <p>Username: {user.username}</p>
      <p>Status: {user.active ? "active" : "unactive"}</p>
      <p>Roles: {user.roles}</p>
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
