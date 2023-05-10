import "../../css/UsersList.css";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useNavigate, Link } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();

  const handleAddUser = () => navigate("/users/newUser");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>Loading users...</p>;
  } else if (isSuccess) {
    content = (
      <main>
        <div>
          <h1>Users</h1>
        </div>
        <div className="users-list__links-list">
          {users.ids.map(userId => (
            <Link to={`/users/${userId}`} key={userId}>
              <User id={userId} />
            </Link>
          ))}
        </div>
      </main>
    );
  } else if (isError) {
    content = (
      <div>
        <p>Snap! ERROR</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <button className="users-list__add-user-button" onClick={handleAddUser}>
        Add user
      </button>
      <div className="users-list">{content}</div>
    </>
  );
};

export default UsersList;
